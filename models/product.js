const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ean: String,
    attributes: {
        WHERL: {
            value: {
                value: String,
            }
        },
    },
    marketingName: {
        finnish: String,
    },
})

productSchema.statics.format = (product) => {
    return {
        ean: product.ean,
        name: product.marketingName.finnish,
        isDomestic: product.attributes.WHERL.value.value === 'FI',
    }
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product