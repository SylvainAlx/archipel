import Param from "../models/paramSchema.js";
import {
  DEFAULT_COSTS,
  DEFAULT_GIFTS,
  DEFAULT_QUOTAS,
} from "../settings/const.js";

export const getNationParam = async () => {
  try {
    const quotas = await getQuotas();
    const costs = await getCosts();
    return { quotas, costs };
  } catch (error) {
    throw error;
  }
};

export const payCreditsFromBank = async (amount) => {
  try {
    let bank = await Param.findOne({ name: "bank" });

    if (!bank) {
      bank = new Param({
        name: "bank",
        props: [{ label: "balance", value: 0 }],
      });
    }

    let balance = bank.props.find((prop) => prop.label === "balance");

    if (!balance) {
      balance = { label: "balance", value: 0 };
      bank.props.push(balance);
    }

    balance.value = Number(balance.value) - Number(amount);
    await bank.save();
  } catch (error) {
    throw error;
  }
};

export const recoverCreditToBank = async (amount) => {
  try {
    let bank = await Param.findOne({ name: "bank" });

    if (!bank) {
      bank = new Param({
        name: "bank",
        props: [{ label: "balance", value: 0 }],
      });
    }

    let balance = bank.props.find((prop) => prop.label === "balance");

    if (!balance) {
      balance = { label: "balance", value: 0 };
      bank.props.push(balance);
    }

    balance.value = Number(balance.value) + Number(amount);
    await bank.save();
  } catch (error) {
    throw error;
  }
};

export const getQuotas = async () => {
  try {
    let quotas = await Param.findOne({ name: "quotas" });
    if (!quotas) {
      quotas = new Param({
        name: "quotas",
        props: [
          { label: "places", value: DEFAULT_QUOTAS.PLACES },
          { label: "tiles", value: DEFAULT_QUOTAS.TILES },
          { label: "coms", value: DEFAULT_QUOTAS.COMS },
        ],
      });
      await quotas.save();
    }
    return quotas;
  } catch (error) {
    throw error;
  }
};

export const getCosts = async () => {
  try {
    let costs = await Param.findOne({ name: "costs" });
    if (!costs) {
      costs = new Param({
        name: "costs",
        props: [
          { label: "place", value: DEFAULT_COSTS.PLACES },
          { label: "tile", value: DEFAULT_COSTS.TILES },
          { label: "com", value: DEFAULT_COSTS.COMS },
        ],
      });
      await costs.save();
    }
    return costs;
  } catch (error) {
    throw error;
  }
};

export const getGifts = async () => {
  try {
    let gifts = await Param.findOne({ name: "gifts" });
    if (!gifts) {
      gifts = new Param({
        name: "gifts",
        props: [
          { label: "register", value: DEFAULT_GIFTS.REGISTER },
          { label: "newNation", value: DEFAULT_GIFTS.NEW_NATION },
          { label: "citizenship", value: DEFAULT_GIFTS.CITIZENSHIP },
        ],
      });
      await gifts.save();
    }
    return gifts;
  } catch (error) {
    throw error;
  }
};

export const getValueFromParam = (paramList, propLabel, defaultValue) => {
  let value = defaultValue;
  if (paramList.props) {
    const selectedProp = paramList.props.find(
      (prop) => prop.label === propLabel,
    );
    if (selectedProp) {
      value = selectedProp.value;
    }
  }
  return value;
};
