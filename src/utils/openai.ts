import OpenAI from 'openai';

const DEMO_MODE = !import.meta.env.VITE_OPENAI_API_KEY;

const openai = DEMO_MODE ? null : new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateLoveResume = async (data: any) => {
  if (DEMO_MODE) {
    return `1. Charming Version
Dear potential partner,

Let me introduce you to ${data.name}, a ${data.age}-year-old ${data.relationshipStatus} soul with a heart of gold. With ${data.pastRelationships} relationships worth of experience, they've grown into someone who truly understands the value of authentic connection. Their green flags shine bright: ${data.greenFlags.join(', ')}. When it comes to the perfect date, they dream of ${data.idealDate}. What they seek in a partner is simple yet meaningful: ${data.expectations}.

2. Roasting Version
Attention brave souls! Meet ${data.name}, ${data.age} years young and still ${data.relationshipStatus} (shocking, we know). After ${data.pastRelationships} attempts at love, they've collected enough red flags to start their own parade: ${data.redFlags.join(', ')}. Their idea of a perfect date (${data.idealDate}) is either adorably optimistic or completely delusional - we'll let you decide. But hey, at least they're honest about their expectations: ${data.expectations}. Proceed with caution... or a good sense of humor!`;
  }

  const prompt = `Create two versions of a love resume for ${data.name}, age ${data.age}:
  1. A charming, positive version that highlights their best qualities
  2. A humorous, roasting version that playfully pokes fun at their traits
  
  Details to incorporate:
  - Current status: ${data.relationshipStatus}
  - Relationship experience: ${data.pastRelationships} past relationships
  - Red flags they admit to: ${data.redFlags.join(', ')}
  - Green flags they claim: ${data.greenFlags.join(', ')}
  - What they want in a partner: ${data.expectations}
  - Their idea of a perfect date: ${data.idealDate}
  
  Make the charming version warm and genuine, highlighting their self-awareness and growth.
  Make the roasting version witty and playful without being mean-spirited.
  Include specific references to their provided details in both versions.`;

  try {
    const response = await openai!.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate love resume. Please try again.');
  }
};

export const generatePrediction = async (data: any) => {
  if (DEMO_MODE) {
    return `🔮 Love Forecast for ${data.name}

Based on your ${data.age} years of life experience and ${data.pastRelationships} past relationships, here's what the stars (and your questionable dating history) predict:

Timeline:
- Next month: You'll finally realize that being ${data.relationshipStatus} doesn't mean you have to collect cats
- 3 months: A mysterious stranger will slide into your DMs (it's probably just a bot)
- 6 months: Your perfect match appears... in your dreams
- 1 year: Plot twist - you actually find someone who gets your weird jokes!

Advice:
1. Your dating strategy of waiting for love to find you while Netflix-and-chilling alone isn't working
2. Try leaving your house occasionally - love rarely delivers via UberEats
3. Being ${data.relationshipStatus} is not a personality trait

Remember: Love is like your phone's battery - it dies when you need it most, but there's always a chance to recharge! 😉`;
  }

  const prompt = `Create a personalized, funny relationship prediction for ${data.name}:
  
  Consider their profile:
  - Age: ${data.age}
  - Current status: ${data.relationshipStatus}
  - Dating experience: ${data.pastRelationships} past relationships
  
  Include:
  1. A playful "fortune teller" style introduction
  2. A timeline of future romantic events (both humorous and hopeful)
  3. Three pieces of witty advice
  4. A funny but encouraging conclusion
  
  Make it personal to their situation, age, and experience level.
  Keep the humor light and supportive, not cynical.
  Include specific references to their current relationship status and past experiences.`;

  try {
    const response = await openai!.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate prediction. Please try again.');
  }
};

export const calculateCompatibility = async (answers1: any, answers2: any) => {
  if (DEMO_MODE) {
    // Generate a more dynamic demo response based on actual answers
    const commonAnswers = Object.keys(answers1).filter(
      key => answers1[key].toLowerCase() === answers2[key].toLowerCase()
    );
    const compatibilityScore = Math.round((commonAnswers.length / Object.keys(answers1).length) * 100);

    return `💘 Compatibility Score: ${compatibilityScore}%

What You Have in Common:
${commonAnswers.map(key => `- Both of you ${answers1[key]}`).join('\n')}

Potential Friction Points:
${Object.keys(answers1)
  .filter(key => answers1[key] !== answers2[key])
  .slice(0, 3)
  .map(key => `- One prefers "${answers1[key]}" while the other chooses "${answers2[key]}"`)
  .join('\n')}

Relationship Advice:
1. Celebrate your similarities, laugh about your differences
2. Communication is key (especially when deciding what's for dinner)
3. Remember: Perfect couples don't exist, but perfect effort does!

Overall: You're like ${compatibilityScore > 75 ? 'peanut butter and jelly' : 'sweet and sour'} - ${
      compatibilityScore > 75 ? 'a classic combination' : 'different but complementary'
    }! 💑`;
  }

  const prompt = `Create a detailed compatibility analysis based on these quiz answers:
  
  Person 1's answers:
  ${Object.entries(answers1)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join('\n')}
  
  Person 2's answers:
  ${Object.entries(answers2)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join('\n')}
  
  Include:
  1. A specific compatibility percentage based on answer alignment
  2. Detailed analysis of common ground and shared values
  3. Thoughtful discussion of potential areas for growth
  4. Practical and humorous advice for navigating differences
  
  Make the analysis personal and specific to their actual answers.
  Balance humor with genuine insight.
  Provide constructive suggestions for building on their compatibility.`;

  try {
    const response = await openai!.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to calculate compatibility. Please try again.');
  }
};