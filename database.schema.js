{
    users:{
        email: String
        handle: String
        password: String
        firstName: String
        secondName: String
        reputation: Number
        deals: [Deal]
        products: [Product]
        comments: [Comment]
        createdAt: Date
        image: File
    }
    Products:{
        title: String
        category: String
        price: Number
        seller: userHandle
        averageRate: Number
        numberOfRates: Number
        postAt: Date
        photo: File
        description: String
        
    }
    Deals: {
        Product: Product
        seller: sellerHandle
        buyer: userHandle
        saledAt: Date
    }
    Comments: {
        Product: productId
        user: userHandle
        rating: Number
        createdAt: Date
    }
    Likes: {
        target: userHandle
        from: userHandle
    }
    Notifications:{
        createdAt: Date
        read: Boolean
        receiver: userHandle
        author: userHandle
        type: String
        product: productId
    }

}