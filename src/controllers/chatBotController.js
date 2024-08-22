import dotenv from "dotenv"
dotenv.config();

const getHomePage = (req, res) => {
    // process data

    // res.render("index.ejs");
    res.status(200).json({ data: "get home page" })

}

const getABC = (req, res) => {
    res.send("ABC")
}

const getWebhook = async (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;


    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }

}
const postWebhook = async (req, res) => {
    let body = req.body;

    if (!body || !body.object) {
        return res.sendStatus(400); // Bad Request
    }

    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });

    if (body.object === "page") {
        try {
            if (body.entry && body.entry[0].messaging) {
                body.entry[0].messaging.forEach((event) => {
                    if (event.message) {
                        handleIncomingMessage(event);
                    }
                    // Handle other event types if needed
                });
            }
            res.status(200).send("EVENT_RECEIVED");
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.sendStatus(500); // Internal Server Error
        }
    } else {
        res.sendStatus(404);
    }
}

const handleIncomingMessage = (event) => {
    const senderId = event.sender.id;
    const messageText = event.message.text;
    // Process the message, e.g., respond to the user
    console.log(`Received message from ${senderId}: ${messageText}`);
};


export { getHomePage, getABC, postWebhook, getWebhook };