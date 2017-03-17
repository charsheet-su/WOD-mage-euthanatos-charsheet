const
  knowledges    = require('./abilities/knowledges.json'),
  skills        = require('./abilities/skills.json'),
  talents       = require('./abilities/talents.json'),
  backgrounds   = require('./advantages/backgrounds.json'),
  mental        = require('./attributes/mental.json'),
  physical      = require('./attributes/physical.json'),
  social        = require('./attributes/social.json'),
  nature        = require('./basic/nature.json'),
  faction       = require('./basic/faction.json'),
  spheres       = require('./basic/spheres.json'),
  knowledgesSec = require('./secondary/knowledges.json'),
  skillsSec     = require('./secondary/skills.json'),
  talentsSec    = require('./secondary/talents.json'),
  flaws         = require('./flaws.json'),
  mock          = require('./mock.json'),
  essence       = require('./basic/essence.json'),
  merits        = require('./merits.json');

module.exports = {
  knowledges,
  essence,
  skills,
  talents,
  backgrounds,
  spheres,
  mental,
  physical,
  faction,
  social,
  nature,
  mock,
  demeanor: nature,
  secondary: {knowledges: knowledgesSec, skills: skillsSec, talents: talentsSec},
  flaws,
  merits,
};
