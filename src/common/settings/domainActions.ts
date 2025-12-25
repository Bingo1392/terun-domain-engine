import { LocalizedItem } from './common'

export enum DomainActionTypes {
  STEWARDSHIP = 'stewardship',
  DIPLOMACY = 'diplomacy',
  TRADE = 'trade',
  MILITARY = 'military',
  SPYING = 'spying',
  MAGIC = 'magic',
  FAITH = 'faith',
}

export type LocalizedDomainAction = {
  type: string
  description: string
} & LocalizedItem

export type DomainAction = {
  key: string
  cz: LocalizedDomainAction
  en: LocalizedDomainAction
  type: DomainActionTypes
}

export const domainActions: DomainAction[] = [
  {
    key: 'tax_collection',
    type: DomainActionTypes.STEWARDSHIP,
    cz: {
      name: 'Výběr daní',
      type: 'Správcovství',
      description: 'Slouží k získání zlata.',
    },
    en: {
      name: 'Tax collection',
      type: 'Stewardship',
      description: 'Used to collect gold.',
    },
  },
  {
    key: 'resource_extraction',
    type: DomainActionTypes.STEWARDSHIP,
    cz: {
      name: 'Těžba zdroje',
      type: 'Správcovství',
      description: 'Slouží k získání zdroje.',
    },
    en: {
      name: 'Resource extraction',
      type: 'Stewardship',
      description: 'Used to collect a resource.',
    },
  },
  {
    key: 'persuasion',
    type: DomainActionTypes.DIPLOMACY,
    cz: {
      name: 'Přesvědčování',
      type: 'Diplomacie',
      description:
        'Přesvědčování slouží k prosazení své vůle v rámci diplomatického vyjednávání.',
    },
    en: {
      name: 'Persuasion',
      type: 'Diplomacy',
      description:
        'Persuasion is used to convince the other party in a diplomatic negotiation.',
    },
  },
  {
    key: 'relationships',
    type: DomainActionTypes.DIPLOMACY,
    cz: {
      name: 'Vztahy',
      type: 'Diplomacie',
      description:
        'Zaměření na vztahy, jako je účast na společenských akcích, malé pozornosti ve formě dárečků a příkladná etiketa napomáhají ve vztazích s ostatními doménami a hlavně osobami, které za doménami stojí.',
    },
    en: {
      name: 'Relationships',
      type: 'Diplomacy',
      description:
        'Focus on relationships, such as participation in social actions, small attention in the form of gifts and examples of labels help in relationships with other domains and mainly with people who hold domains.',
    },
  },
  {
    key: 'town_workshop',
    type: DomainActionTypes.TRADE,
    cz: {
      name: 'Městská dílna',
      type: 'Obchod',
      description:
        'Slouží k tvorbě výrobků ze zdroje. Výrobek je možné prodávat na lokálním trhu (což je nejjednodušší) nebo je možné exportovat výrobek na další trhy. Městská dílna generuje zlato ze zdroje.',
    },
    en: {
      name: 'Town workshop',
      type: 'Trade',
      description:
        'Used to create products from a resource. The product can be sold on the local market (which is the easiest) or can be exported to other markets. Town workshop generates gold from the resource.',
    },
  },
  {
    key: 'caravan',
    type: DomainActionTypes.TRADE,
    cz: {
      name: 'Karavana',
      type: 'Obchod',
      description:
        'Slouží k přepravě zboží mezi městy a umožňuje obchodování na vzdálených trzích. Karavana generuje zlato ze zdroje nebo více zlata z výrobku',
    },
    en: {
      name: 'Caravan',
      type: 'Trade',
      description:
        'Used to transport goods between cities and enables trading in distant markets.',
    },
  },
  {
    key: 'trading_ship',
    type: DomainActionTypes.TRADE,
    cz: {
      name: 'Obchodní loď',
      type: 'Obchod',
      description:
        'Slouží k námořnímu obchodu a přepravě zboží mezi přístavními městy.',
    },
    en: {
      name: 'Trading ship',
      type: 'Trade',
      description:
        'Used for maritime trade and transportation of goods between port cities.',
    },
  },
  {
    key: 'money_lending',
    type: DomainActionTypes.TRADE,
    cz: {
      name: 'Půjčování peněz',
      type: 'Obchod',
      description: 'Slouží ke generování peněz z peněz.',
    },
    en: {
      name: 'Trading ship',
      type: 'Trade',
      description:
        'Used for maritime trade and transportation of goods between port cities.',
    },
  },
  {
    key: 'guarding',
    type: DomainActionTypes.MILITARY,
    cz: {
      name: 'Ochrana',
      type: 'Vojenské',
      description:
        'Ochrana je propůjčení vojenské síly k ochranným účelům, kde nehrozí jasná hrozba, ale jedná se spíše o pojistku. Může se jednat o ochranu karavany či obchodních lodí proti pirátům a lapkům.',
    },
    en: {
      name: 'Guarding',
      type: 'Military',
      description:
        'Guarding is a reservation of military strength for defensive purposes, where there is no immediate threat but rather a protection. It can be a guard against caravans or trading ships against pirates and thieves.',
    },
  },
  {
    key: 'mercenary',
    type: DomainActionTypes.MILITARY,
    cz: {
      name: 'Žoldnéřství',
      type: 'Vojenské',
      description:
        'Žoldnéřství je pronájem vojenské síly k útočným i ochraným účelům. Tento typ pronájmu je výdělečnější, ale také daleko nebezpečnější.',
    },
    en: {
      name: 'Mercenary',
      type: 'Military',
      description:
        'Mercenary is a purchase of military strength for attacking and defensive purposes. This type of purchase is more expensive, but also more dangerous.',
    },
  },
  {
    key: 'reveal_secret',
    type: DomainActionTypes.SPYING,
    cz: {
      name: 'Odhalení tajemství',
      type: 'Špehování',
      description:
        'Získávání tajných informací o dané osobě. Tyto tajné informace se dají využít při vyjednávání.',
    },
    en: {
      name: 'Reveal secret',
      type: 'Spying',
      description:
        'Gathering secret information about a person. These secret information can be used in negotiations.',
    },
  },
  {
    key: 'thievery',
    type: DomainActionTypes.SPYING,
    cz: {
      name: 'Krádeže',
      type: 'Špehování',
      description:
        'Doména vyšle do ulic, kde operuje, pobudy a lapky. Jejich úkolem je naplnit drobnými krádežmi pokladnici jejich pána.',
    },
    en: {
      name: 'Thievery',
      type: 'Spying',
      description:
        'The Domain sends to the streets, where it operates, police and thieves. Their task is to fill their pockets with small thievery.',
    },
  },
  {
    key: 'robbery',
    type: DomainActionTypes.SPYING,
    cz: {
      name: 'Loupež',
      type: 'Špehování',
      description:
        'Plánovaná loupež nějakého cenějšího nebo důležitějšího předmětu.',
    },
    en: {
      name: 'Robbery',
      type: 'Spying',
      description: 'Planned robbery of a more expensive or important item.',
    },
  },
  {
    key: 'kidnapping',
    type: DomainActionTypes.SPYING,
    cz: {
      name: 'Únos',
      type: 'Špehování',
      description: 'Plánovaný únos důležité osoby.',
    },
    en: {
      name: 'Kidnapping',
      type: 'Spying',
      description: 'Planned kidnapping of a very important person.',
    },
  },
  {
    key: 'assassination',
    type: DomainActionTypes.SPYING,
    cz: {
      name: 'Vražda',
      type: 'Špehování',
      description: 'Plánovaná vražda důležité osoby.',
    },
    en: {
      name: 'Assassination',
      type: 'Spying',
      description: 'Planned assassination of a very important person.',
    },
  },
  {
    key: 'alchemical_laboratory',
    type: DomainActionTypes.MAGIC,
    cz: {
      name: 'Alchymistická laboratoř',
      type: 'Magie',
      description:
        'Dílna zaměřena na výrobu alchymistických či magických předmětů. Tyto výrobky je možné prodávat na místním trhu nebo exportovat na vzdálené trhy.',
    },
    en: {
      name: 'Alchemical laboratory',
      type: 'Magic',
      description:
        'A domain focused on the production of alchemical or magical items. These items can be sold on the local market or exported to remote markets.',
    },
  },
  {
    key: 'magic_academy',
    type: DomainActionTypes.MAGIC,
    cz: {
      name: 'Magická akademie',
      type: 'Magie',
      description:
        'Magická akademie může prozkoumávat a vyvíjet různé magické technologie a očarování. Ty se dají využívat v celé řadě odvětví. Akademie se však ve většině případů bez vnějšího financování neobejde.',
    },
    en: {
      name: 'Magic academy',
      type: 'Magic',
      description:
        'A magic academy can explore and develop various magical technologies and enchantments. These can be used in various fields. However, in most cases the academy needs external funding.',
    },
  },
  {
    key: 'public_opinion',
    type: DomainActionTypes.FAITH,
    cz: {
      name: 'Veřejné mínění',
      type: 'Víra',
      description:
        'Každá doména zaměřena na víru je vnímána s respektem a na její slovo je brán zřetel. Za almužnu či jiné dary proto může taková doména ovlivňovat veřejné mínění na jinou doménu. Tohoto velmi užívají různí vládcové, kteří nechávají vystavět chrámy a darovávají pozemnky doménám zaměřeným na víru.',
    },
    en: {
      name: 'Public opinion',
      type: 'Faith',
      description:
        'Every domain focused on faith is perceived with respect and its word is taken into account. Therefore, in exchange for alms or other donations, such a domain can influence public opinion on another domain. This is greatly used by various rulers who have temples built and donate land to domains focused on faith.',
    },
  },
  {
    key: 'legitimacy',
    type: DomainActionTypes.FAITH,
    cz: {
      name: 'Legitimita',
      type: 'Víra',
      description:
        'Legitimita je právní a božské potvrzení, že nějaký čin je v souladu s dobrými mravy. Legitimitu hojně užívají šlechtici, aby potvrdili jejich nárok na tituly a případný konflikt se dal považovat za spravedlivý.',
    },
    en: {
      name: 'Legitimacy',
      type: 'Faith',
      description:
        'Legitimacy is the legal and divine confirmation that an action is in accordance with good morals. Legitimacy is widely used by nobles to confirm their claim to titles and to ensure that any conflict can be considered just.',
    },
  },
]
