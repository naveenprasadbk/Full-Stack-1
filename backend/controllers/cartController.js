import userModel from "../models/userModel.js";

// add items to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        let cartData = user.cartData || {};

        // If item exists, increment quantity, else set to 1
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        // Save updated cartData
        user.cartData = cartData;
        user.markModified("cartData"); // 👈 Add this line
        await user.save();

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        let user = await userModel.findById(userId);
        let cartData = user.cartData || {};

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            // If quantity becomes 0, remove the item completely
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        user.cartData = cartData;
        user.markModified("cartData"); // Force update
        await user.save();

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = user.cartData || {};
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {addToCart,removeFromCart,getCart}