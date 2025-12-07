import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ProductRow } from "@/types/database";

/**
 * AI Grounding Strategy
 * 
 * The AI chat is grounded to specific product data using the following approach:
 * 
 * 1. System Prompt: Instructs the AI to only use provided product data
 * 2. Context Injection: Product details are injected into the prompt
 * 3. Grounded Responses: AI generates responses based solely on product data
 * 4. Fallback: If AI fails, uses rule-based smart response system
 * 
 * This ensures responses are accurate and traceable to source data.
 */

// Initialize Gemini client
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Generate AI response using Google Gemini
 */
export async function generateAIResponse(
  product: ProductRow, 
  question: string,
  history: { role: string; content: string }[] = []
): Promise<{ response: string; source: "gemini" | "fallback" }> {
  // If Gemini API is not configured, use fallback
  if (!genAI) {
    console.warn("Gemini API key not configured, using fallback response");
    return {
      response: generateSmartResponse(product, question),
      source: "fallback",
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build the grounded system prompt
    const systemPrompt = buildSystemPrompt(product);
    
    // Build chat history
    const chatHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Create chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I will only answer questions about this specific loan product using the provided data. I will not make up any information." }],
        },
        ...chatHistory,
      ],
    });

    // Send the user's question
    const result = await chat.sendMessage(question);
    const response = result.response.text();

    return {
      response,
      source: "gemini",
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback to smart response if AI fails
    return {
      response: generateSmartResponse(product, question),
      source: "fallback",
    };
  }
}

/**
 * Build a grounded system prompt with product data
 */
function buildSystemPrompt(product: ProductRow): string {
  const faqText = product.faq?.length 
    ? product.faq.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
    : "No FAQs available";

  const eligibility = product.terms?.eligibility_criteria?.join(", ") || "Standard eligibility criteria apply";
  const documents = product.terms?.required_documents?.join(", ") || "Standard documents required";
  
  return `You are a helpful loan assistant. You MUST only answer questions about the following loan product. 
Do NOT make up any information. If the answer is not in the provided data, say "I don't have that specific information about this product."

=== LOAN PRODUCT DATA ===

Product Name: ${product.name}
Bank: ${product.bank}
Loan Type: ${product.type}
Summary: ${product.summary}

FINANCIAL DETAILS:
- Interest Rate (APR): ${product.rate_apr}%
- Minimum Income Required: ₹${product.min_income.toLocaleString("en-IN")}/month
- Minimum Credit Score: ${product.min_credit_score}
- Tenure: ${product.tenure_min_months} to ${product.tenure_max_months} months
- Processing Fee: ${product.processing_fee_pct}%
- Prepayment Allowed: ${product.prepayment_allowed ? "Yes" : "No"}
${product.terms?.prepayment_penalty ? `- Prepayment Penalty: ${product.terms.prepayment_penalty}` : ""}

DISBURSAL & PROCESSING:
- Disbursal Speed: ${product.disbursal_speed}
- Documentation Level: ${product.docs_level}
${product.terms?.processing_time ? `- Processing Time: ${product.terms.processing_time}` : ""}

ELIGIBILITY CRITERIA:
${eligibility}

REQUIRED DOCUMENTS:
${documents}

${product.terms?.late_payment_fee ? `LATE PAYMENT FEE: ${product.terms.late_payment_fee}` : ""}

FREQUENTLY ASKED QUESTIONS:
${faqText}

=== END OF PRODUCT DATA ===

Instructions:
1. Only answer questions about THIS specific loan product
2. Use the data provided above to answer questions
3. Be concise and helpful
4. If asked about something not in the data, politely say you don't have that information
5. Format responses clearly with bullet points where appropriate
6. Always mention the product name when relevant`;
}

/**
 * Generate a smart response based on the question and product data
 * This works without requiring an AI API (fallback system)
 */
export function generateSmartResponse(product: ProductRow, question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  // Check for eligibility/requirements questions
  if (lowerQuestion.includes("eligib") || lowerQuestion.includes("requirement") || lowerQuestion.includes("qualify")) {
    const eligibility = product.terms?.eligibility_criteria || [];
    let response = `To be eligible for the ${product.name}, you need to meet the following requirements:\n\n`;
    response += `• Minimum Credit Score: ${product.min_credit_score}\n`;
    response += `• Minimum Income: ₹${product.min_income.toLocaleString("en-IN")}/month\n`;
    
    if (eligibility.length > 0) {
      response += `\nAdditional eligibility criteria:\n`;
      eligibility.forEach((criteria) => {
        response += `• ${criteria}\n`;
      });
    }
    
    return response;
  }
  
  // Check for document questions
  if (lowerQuestion.includes("document") || lowerQuestion.includes("doc") || lowerQuestion.includes("paper")) {
    const docs = product.terms?.required_documents || [];
    if (docs.length > 0) {
      let response = `The required documents for the ${product.name} are:\n\n`;
      docs.forEach((doc) => {
        response += `• ${doc}\n`;
      });
      return response;
    }
    return `The documentation requirement for this loan is ${product.docs_level}. Please contact the bank for a complete list of required documents.`;
  }
  
  // Check for prepayment questions
  if (lowerQuestion.includes("prepay") || lowerQuestion.includes("pre-pay") || lowerQuestion.includes("early")) {
    const prepaymentAllowed = product.prepayment_allowed;
    const penalty = product.terms?.prepayment_penalty;
    
    let response = prepaymentAllowed 
      ? `Yes, prepayment is allowed for the ${product.name}.\n\n`
      : `No, prepayment is not allowed for the ${product.name}.\n\n`;
    
    if (penalty) {
      response += `Prepayment terms: ${penalty}`;
    }
    
    return response;
  }
  
  // Check for interest rate / APR questions
  if (lowerQuestion.includes("interest") || lowerQuestion.includes("rate") || lowerQuestion.includes("apr")) {
    return `The ${product.name} offers an interest rate of ${product.rate_apr}% APR. This is ${product.rate_apr <= 10 ? "a competitive rate" : "the standard rate"} for ${product.type} loans.`;
  }
  
  // Check for tenure questions
  if (lowerQuestion.includes("tenure") || lowerQuestion.includes("duration") || lowerQuestion.includes("period") || lowerQuestion.includes("long")) {
    return `The ${product.name} offers flexible tenure options ranging from ${product.tenure_min_months} months to ${product.tenure_max_months} months (${Math.floor(product.tenure_min_months/12)} to ${Math.floor(product.tenure_max_months/12)} years). You can choose a tenure that best fits your repayment capacity.`;
  }
  
  // Check for processing fee questions
  if (lowerQuestion.includes("fee") || lowerQuestion.includes("processing") || lowerQuestion.includes("charge")) {
    const fee = product.processing_fee_pct;
    const lateFee = product.terms?.late_payment_fee;
    
    let response = fee === 0 
      ? `Great news! The ${product.name} has zero processing fee.\n\n`
      : `The processing fee for ${product.name} is ${fee}% of the loan amount.\n\n`;
    
    if (lateFee) {
      response += `Late payment fee: ${lateFee}`;
    }
    
    return response;
  }
  
  // Check for disbursal / speed questions
  if (lowerQuestion.includes("disburs") || lowerQuestion.includes("fast") || lowerQuestion.includes("quick") || lowerQuestion.includes("time")) {
    const speed = product.disbursal_speed;
    const processingTime = product.terms?.processing_time;
    
    let response = `The ${product.name} has ${speed} disbursal speed.\n\n`;
    
    if (processingTime) {
      response += `Processing time: ${processingTime}`;
    }
    
    return response;
  }
  
  // Check for credit score questions
  if (lowerQuestion.includes("credit") || lowerQuestion.includes("cibil") || lowerQuestion.includes("score")) {
    return `The minimum credit score required for the ${product.name} is ${product.min_credit_score}. A ${product.min_credit_score <= 650 ? "lower credit score is acceptable for this product, making it more accessible" : "good credit score is required for this product"}.`;
  }
  
  // Check for income questions
  if (lowerQuestion.includes("income") || lowerQuestion.includes("salary") || lowerQuestion.includes("earn")) {
    return `The minimum income requirement for the ${product.name} is ₹${product.min_income.toLocaleString("en-IN")}/month. ${product.min_income === 0 ? "This product has no minimum income requirement, making it accessible for students and others." : ""}`;
  }
  
  // Check FAQ for matching answers
  if (product.faq && product.faq.length > 0) {
    for (const faq of product.faq) {
      const faqQuestion = faq.question.toLowerCase();
      // Simple keyword matching
      const questionWords = lowerQuestion.split(" ").filter(w => w.length > 3);
      const faqWords = faqQuestion.split(" ").filter(w => w.length > 3);
      
      const matchingWords = questionWords.filter(word => faqWords.some(fw => fw.includes(word) || word.includes(fw)));
      
      if (matchingWords.length >= 2) {
        return faq.answer;
      }
    }
  }
  
  // Default response with product summary
  return getFallbackResponse(product);
}


/**
 * Fallback response when AI is unavailable or question is out of scope
 */
export function getFallbackResponse(product: ProductRow): string {
  return `I can help you with information about the ${product.name} from ${product.bank}. 

Here's what I know about this product:
- Interest Rate: ${product.rate_apr}% APR
- Minimum Income Required: ₹${product.min_income.toLocaleString("en-IN")}/month
- Minimum Credit Score: ${product.min_credit_score}
- Tenure: ${product.tenure_min_months} to ${product.tenure_max_months} months

Please feel free to ask me specific questions about eligibility, documentation, fees, or any other aspect of this loan product.`;
}
