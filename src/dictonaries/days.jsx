var days = {
  actual_days: {
    1: { // day 0
      events: [],
      c_standards: [70, 70, 70, 0],
    },
    3: { // day 3
      events: ["bouncyball"],
      c_standards: [75, 75, 75, 0],
      description: "A new fad has arisen. Because of this some customers may request bouncy balls on their burger."
    },
    5: { // day 5
      events: ["secretshopper"],
      c_standards: [78, 78, 78, 0],
      s_standards: [80,80,90,0],
      description: `There will be a Secret Shopper arriving tomorrow. Don't mess up their order.
      By end of day HR requests your standards are as follows:\nPresentation: ${80}%  Punctuality: ${80}%\nPrecision: ${90}%  Pleasantry: ${0}%`
    },
    6: { // day 6
      events: [],
      c_standards: [80, 80, 80, 0],
      description: `You've passed. Next time HR will look at Pleasantry.`
    },
    7: { // day 7
      events: [],
      c_standards: [80,80,90,0],
      description: `While you read that 1,585 burgers were consumed in the United States.`
    },
    10: {
      events: ["secretshopper"],
      c_standards: [85, 85, 90, 5],
      s_standards: [90,90,95,20],
      description: `There will be a Secret Shopper arriving tomorrow. By end of day HR requests your standards are as follows:
      \nPresentation: ${90}%  Punctuality: ${90}%\nPrecision: ${95}%   Pleasantry: ${20}%`
    },

    12: {
      events: ["cheese"],
      c_standards: [90, 90, 95, 20],
      description: `Head Quarters has identified an opportunity of enhancement by integrating the menu with cheese. The company wants to cultivate a more lactose-tolerant image.`
    },

    15: {
      events: ["secretshopper"],
      c_standards: [95, 95, 95, 50],
      s_standards: [100,100,100,50],
      description: `There will be a Secret Shopper arriving tomorrow. By end of day HR requests your standards are as follows:
      \nPresentation: ${100}%  Punctuality: ${100}%\nPrecision: ${100}%   Pleasantry: ${50}%`
    },

    17: {
      events: ["rats"],
      c_standards: [100, 100, 100, 60],
      description: `The aroma of cheddar has wafted to a nearby rat's nest. You will now deal with rat infestations. Each rat in your kitchen will drop your Pleasantry ratings by 10%.`
    },

    20: {
      events: ["secretshopper"],
      c_standards: [100, 100, 100, 80],
      s_standards: [150,150,150,100],
      description: `There will be a Secret Shopper arriving tomorrow. By end of day HR requests your standards are as follows:
      \nPresentation: ${150}%  Punctuality: ${150}%\nPrecision: ${150}%   Pleasantry: ${100}%`
    },

    21: {
      events: [],
      c_standards: [120, 120, 120, 100],
      description: `You've reached burger consummation congratulations!\nThis marks the beginning of infinity.`
    },

  },
};

export default days;


// this.secretShopperStandards = [
//     { Presentation: 80, Punctuality: 80, Precision: 90, Pleasantry: 5 },
//     { Presentation: 90, Punctuality: 90, Precision: 95, Pleasantry: 20 },
//     { Presentation: 95, Punctuality: 95, Precision: 98, Pleasantry: 50 },
//     { Presentation: 98, Punctuality: 98, Precision: 99, Pleasantry: 80 },
//     { Presentation: 100, Punctuality: 100, Precision: 100, Pleasantry: 100 }
//   ]