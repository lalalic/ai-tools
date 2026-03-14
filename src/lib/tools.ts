// Tool configurations for all AI tools
export interface ToolConfig {
  id: string
  name: string
  description: string
  icon: string
  placeholder: string
  systemPrompt: string
  inputLabel: string
  outputLabel: string
  options?: { label: string; value: string }[]
  optionLabel?: string
}

export const toolConfigs: Record<string, ToolConfig> = {
  writer: {
    id: 'writer',
    name: 'AI Writer',
    description: 'Generate blog posts, articles, and marketing copy in seconds.',
    icon: '✍️',
    placeholder: 'Write a 500-word blog post about the benefits of remote work for software developers. Include practical tips and a compelling introduction.',
    systemPrompt: 'You are a professional content writer. Write high-quality, engaging content based on the user\'s request. Use clear structure with headings, maintain a professional but conversational tone, and ensure the content is informative and actionable.',
    inputLabel: 'What would you like me to write?',
    outputLabel: 'Generated Content',
    options: [
      { label: 'Blog Post', value: 'blog' },
      { label: 'Article', value: 'article' },
      { label: 'Marketing Copy', value: 'marketing' },
      { label: 'Product Description', value: 'product' },
      { label: 'Story', value: 'story' },
    ],
    optionLabel: 'Content Type',
  },
  email: {
    id: 'email',
    name: 'Email Generator',
    description: 'Professional emails — cold outreach, follow-ups, replies.',
    icon: '📧',
    placeholder: 'Write a cold outreach email to a potential client for our web development agency. They are a mid-size e-commerce company that needs a website redesign.',
    systemPrompt: 'You are an expert email copywriter. Write professional, concise, and effective emails. Use proper email structure with subject line, greeting, body, and sign-off. Make the emails persuasive but not pushy.',
    inputLabel: 'Describe the email you need',
    outputLabel: 'Generated Email',
    options: [
      { label: 'Cold Outreach', value: 'cold' },
      { label: 'Follow Up', value: 'followup' },
      { label: 'Reply', value: 'reply' },
      { label: 'Thank You', value: 'thankyou' },
      { label: 'Apology', value: 'apology' },
    ],
    optionLabel: 'Email Type',
  },
  translator: {
    id: 'translator',
    name: 'AI Translator',
    description: 'Natural translation between 50+ languages. Not robotic.',
    icon: '🌐',
    placeholder: 'Translate this to Japanese:\n\nOur company specializes in AI-powered solutions that help businesses automate their workflows and increase productivity.',
    systemPrompt: 'You are a professional translator. Provide natural, fluent translations that read as if written by a native speaker. Preserve the original meaning, tone, and cultural nuances. If the target language is not specified, translate to English.',
    inputLabel: 'Paste text to translate (specify target language)',
    outputLabel: 'Translation',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Chinese', value: 'zh' },
      { label: 'Japanese', value: 'ja' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
    ],
    optionLabel: 'Target Language',
  },
  code: {
    id: 'code',
    name: 'Code Generator',
    description: 'Generate, explain, and debug code. Any language.',
    icon: '💻',
    placeholder: 'Write a Python function that takes a list of numbers and returns the top 3 most frequent elements. Include error handling and type hints.',
    systemPrompt: 'You are an expert software engineer. Generate clean, well-documented, production-ready code. Include comments, type annotations, and error handling where appropriate. If explaining code, be clear and concise.',
    inputLabel: 'Describe the code you need',
    outputLabel: 'Generated Code',
    options: [
      { label: 'Generate Code', value: 'generate' },
      { label: 'Explain Code', value: 'explain' },
      { label: 'Debug Code', value: 'debug' },
      { label: 'Refactor Code', value: 'refactor' },
      { label: 'Write Tests', value: 'test' },
    ],
    optionLabel: 'Task Type',
  },
  summarizer: {
    id: 'summarizer',
    name: 'Text Summarizer',
    description: 'Condense long documents into key points instantly.',
    icon: '📋',
    placeholder: 'Paste your long text, article, or document here and I will summarize it into concise key points...',
    systemPrompt: 'You are an expert at summarizing content. Create clear, concise summaries that capture the key points, main arguments, and important details. Use bullet points for clarity. Maintain accuracy and don\'t add information not present in the original text.',
    inputLabel: 'Paste text to summarize',
    outputLabel: 'Summary',
    options: [
      { label: 'Key Points', value: 'points' },
      { label: 'Executive Summary', value: 'executive' },
      { label: 'One Paragraph', value: 'paragraph' },
      { label: 'One Sentence', value: 'sentence' },
    ],
    optionLabel: 'Summary Style',
  },
  social: {
    id: 'social',
    name: 'Social Media Posts',
    description: 'Engaging posts for Twitter, LinkedIn, Instagram, TikTok.',
    icon: '📱',
    placeholder: 'Create an engaging LinkedIn post about our new AI-powered productivity tool that helps professionals save 2 hours per day. Include relevant hashtags.',
    systemPrompt: 'You are a social media expert. Create engaging, platform-optimized posts that drive engagement. Use appropriate tone, length, hashtags, and formatting for each platform. Include a call-to-action when relevant.',
    inputLabel: 'What should the post be about?',
    outputLabel: 'Generated Post',
    options: [
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Twitter/X', value: 'twitter' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'TikTok', value: 'tiktok' },
      { label: 'Facebook', value: 'facebook' },
    ],
    optionLabel: 'Platform',
  },
  resume: {
    id: 'resume',
    name: 'Resume Builder',
    description: 'Transform your experience into powerful resume bullets.',
    icon: '📄',
    placeholder: 'I worked as a software engineer at Google for 3 years. I led a team of 5 developers, built microservices in Go, reduced API latency by 40%, and mentored 3 junior engineers.',
    systemPrompt: 'You are an expert resume writer and career coach. Transform job experiences into powerful, quantified resume bullet points using the STAR method (Situation, Task, Action, Result). Use strong action verbs and include metrics where possible. Format professionally.',
    inputLabel: 'Describe your work experience',
    outputLabel: 'Resume Bullets',
    options: [
      { label: 'Bullet Points', value: 'bullets' },
      { label: 'Summary Section', value: 'summary' },
      { label: 'Cover Letter', value: 'cover' },
      { label: 'LinkedIn Bio', value: 'linkedin' },
    ],
    optionLabel: 'Output Format',
  },
  seo: {
    id: 'seo',
    name: 'SEO Optimizer',
    description: 'Meta descriptions, titles, and keyword-rich content.',
    icon: '🔍',
    placeholder: 'Optimize for SEO: "AI productivity tools for professionals" — generate meta title, meta description, H1, and 5 related keywords.',
    systemPrompt: 'You are an SEO expert. Generate SEO-optimized content including meta titles (50-60 chars), meta descriptions (150-160 chars), H1 tags, keyword suggestions, and content outlines. Follow current SEO best practices.',
    inputLabel: 'Enter your topic or page content',
    outputLabel: 'SEO Recommendations',
    options: [
      { label: 'Meta Tags', value: 'meta' },
      { label: 'Keywords', value: 'keywords' },
      { label: 'Content Outline', value: 'outline' },
      { label: 'Full SEO Audit', value: 'audit' },
    ],
    optionLabel: 'SEO Task',
  },
}
