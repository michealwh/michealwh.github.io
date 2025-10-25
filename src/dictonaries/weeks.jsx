var weeks = {
  weeks: {
    1: {
      events: ["bouncyball", "secretshopper"],
      c_standards: [75, 75, 75, 0],
      s_standards: [80, 80, 90, 5],
    },
  },
  actual_weeks: {
    0: { // day 1-5
      events: [],
      c_standards: [70, 70, 70, 0],
    },
    1: { // day 6-10
      events: ["bouncyball"],
      c_standards: [75, 75, 75, 0],
      description: "You've made it to Week 2. A new fad has arisen. Because of this some customers may request bouncy balls on their burger."
    },
    2: { // day 11-15
      events: ["secretshopper"],
      c_standards: [78, 78, 78, 0],
      s_standards: [80,80,90,5],
      description: `You've made it to Week 3. There will be a Secret Shopper arriving this Friday. Don't mess up their order.
      By end of week HR requests your standards are as follows:\n\nPresentation: ${80}%\nPunctuality: ${80}%\nPrecision: ${90}%\nPleasantry: ${5}%`
    },
    3: { // day 16-20
      events: [],
      c_standards: [80,80,80,10],
      description: `You've made it to Week 4. While you read that 1,585 burgers were consumed in the United States.`
    },
    4: {
      events: ["secretshopper"],
      c_standards: [85, 85, 85, 5],
      s_standards: [90,90,95,50],
      description: `You've made it to Week 5. There will be a Secret Shopper arriving this Friday. By end of week HR requests your standards are as follows:
      \n\nPresentation: ${90}%\nPunctuality: ${90}%\nPrecision: ${95}%\nPleasantry: ${20}%`
    }
  },
};

export default weeks;


// this.secretShopperStandards = [
//     { Presentation: 80, Punctuality: 80, Precision: 90, Pleasantry: 5 },
//     { Presentation: 90, Punctuality: 90, Precision: 95, Pleasantry: 20 },
//     { Presentation: 95, Punctuality: 95, Precision: 98, Pleasantry: 50 },
//     { Presentation: 98, Punctuality: 98, Precision: 99, Pleasantry: 80 },
//     { Presentation: 100, Punctuality: 100, Precision: 100, Pleasantry: 100 }
//   ]