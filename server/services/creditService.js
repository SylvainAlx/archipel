import Param from "../models/paramSchema.js";

export const payCredits = async (amount) => {
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

export const recoverCredit = async (amount) => {
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
