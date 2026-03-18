import { Products } from "../config/models/product.model.js";

export const ordenationProducts = async (req, res) => {
    try {
        const resultado = await Products.aggregate([
            {
                $sort: {name:-1}
            }
        ])
        res.status(200).json({ resultado });
    } catch (error) {
        console.error("Error, se producjo un error en ordenationProducts. ", error);
        (res.status(500).json({ error: "Error, se producjo un error en ordenationProducts." }));
    }
};
