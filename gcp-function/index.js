const functions = require('@google-cloud/functions-framework');

const { processInsights } = require('./process-feedback.action');

// Register an HTTP function with the Functions Framework
functions.http('processInsightsFunction', async (req, res) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { processId, userId } = req.body;
    console.log(`Processing insights for user ${userId}`);

    // Process insights
    await processInsights(processId, userId);

    console.log(`Processing completed for user ${userId}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing insights:', error);
    res
      .status(500)
      .json({ error: 'Processing failed', details: error.message });
  }
});
