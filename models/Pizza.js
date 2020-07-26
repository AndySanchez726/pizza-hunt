const {Schema, model} = require('mongoose');
const moment = require('moment');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    // return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
    return this.comments.length;
});

// create the pizza model using the pizzaschema
const Pizza = model('Pizza', PizzaSchema);

// export the pizza model
module.exports = Pizza;