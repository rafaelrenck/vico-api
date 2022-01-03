import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

import { knex } from "../../../../database/knex";

type Filter = {
  month: string;
  types: string[];
  insurance: string;
  invoice: string;
  patient: string;
  page: number;
};

dayjs.extend(timezone);
dayjs.tz.setDefault("America/Sao_Paulo");

export class ListAppointmentsUseCase {
  async execute(filter: Filter) {
    const results = await knex
      .select(
        "fia.id_fia as id_fia",
        "fia.data_atendimento as date",
        "fia.hora_inicio as hour",
        "fia.tipo_atend as type",
        "pac.registro as id_patient",
        "pac.nm_paciente as patient"
      )
      .modify((queryBuilder) => {
        if (filter.invoice === "") {
          queryBuilder
            .from("sigh.ficha_amb_int as fia")
            .leftJoin(
              "sigh.pacientes as pac",
              "fia.cod_paciente",
              "pac.id_paciente"
            )
            .whereBetween("fia.data_atendimento", [
              dayjs(filter.month).startOf("month").format("YYYY-MM-DD"),
              dayjs(filter.month).endOf("month").format("YYYY-MM-DD"),
            ])
            .where({
              "fia.cod_convenio": filter.insurance.toString(),
            })
            .whereIn("fia.tipo_atend", filter.types)
            .whereRaw("pac.nm_paciente ilike ?", [
              filter.patient.toString().concat("%"),
            ])
            .orderBy([
              "fia.tipo_atend",
              "fia.data_atendimento",
              "fia.hora_inicio",
              "pac.nm_paciente",
            ]);
        } else {
          queryBuilder
            .from("sigh.faturas_contas as rem")
            .leftJoin("sigh.contas as cnt", "rem.id_fatura", "cnt.cod_fatura")
            .leftJoin("sigh.ficha_amb_int as fia", "cnt.cod_fia", "fia.id_fia")
            .leftJoin(
              "sigh.pacientes as pac",
              "fia.cod_paciente",
              "pac.id_paciente"
            )
            .where({
              "rem.cod_convenio": filter.insurance.toString(),
              "rem.numero_fatura": filter.invoice,
            })
            .orderBy(["pac.nm_paciente", "fia.hora_inicio"]);
        }
      });

    const totalCount = results.length.toString();
    const appointments = results.slice(
      (filter.page - 1) * 10,
      (filter.page - 1) * 10 + 10
    );
    return { totalCount, appointments };
  }
}
