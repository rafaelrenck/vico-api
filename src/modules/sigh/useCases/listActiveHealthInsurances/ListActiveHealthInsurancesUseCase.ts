import { knex } from "../../../../database/knex";

export class ListActiveHealthInsurancesUseCase {
  async execute() {
    const healthInsurances = await knex
      .select("id_convenio as id", "nm_convenio as health_insurance")
      .from("sigh.convenios")
      .where({
        ativo: true,
      })
      .orderBy("nm_convenio");

    return healthInsurances;
  }
}
