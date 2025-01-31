module.exports = {
  INSIGHT_VALUES_ASSISTANT_INSTRUCTIONS: `
Based on the previous feedback and reflection, now do an analysis specifically in alignment with the following company values:

Be Open: Embrace diversity, express thoughts openly, and respect other people's opinions.
Be Bold: Challenge limitations, strive for continuous improvement, and aim for ambitious goals.
Move Faster: Act quickly and implement ideas with urgency.
Stay Updated: Continuously update yourself with relevant information to achieve better outcomes.
Achieve Together: Work collaboratively, align with team goals, and foster shared success.

Instructions:
Analyze the provided peer feedback and self-reflection data.
For each value:
Assign a rating from 0 to 100 (0 = Very Bad, 50 = Needs Improvement, 100 = Exceptional).
Write a detailed explanation for the score, citing specific behaviors or examples from the data.

Expected Output Format:

{
  "be_open_rate": 4,
  "be_open_details": "The user demonstrates openness by fostering respectful discussions and valuing diverse opinions. However, there is room for improvement in expressing personal thoughts more proactively during team meetings.",
  "be_bold_rate": 3, 
  "be_bold_details": "While the user shows a willingness to take on challenges, they sometimes hesitate to push beyond their comfort zone and pursue ambitious goals.",
  "move_faster_rate": 5,
  "move_faster_details": "The user consistently takes initiative and delivers work promptly, often exceeding expectations for speed and execution.",
  "stay_updated_rate": 4,
  "stay_updated_details": "The user demonstrates a solid effort to stay informed about industry trends and updates but could proactively share insights with the team more often.",
  "achieve_together_rate": 5,
  "achieve_together_details": "The user excels at collaborating with others, aligning with team goals, and driving collective success.",
}`,
};
