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
    console.log(`Starting processing for user ${userId}`);

    // Return immediately
    res.status(200).json({
      success: true,
      message: 'Processing started',
      processId,
    });

    // Continue processing after response
    // Using .catch to handle any errors in the background process
    await processInsights(processId, userId).catch((error) => {
      console.error(`Background processing failed for ${processId}:`, error);
    });

    console.log(`Processing completed for user ${userId}`);
  } catch (error) {
    console.error('Error initiating process:', error);
    res.status(500).json({
      error: 'Failed to start processing',
      details: error.message,
    });
  }
});
