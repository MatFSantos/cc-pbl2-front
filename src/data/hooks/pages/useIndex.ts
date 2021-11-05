import PacienteInterface from 'data/@types/pacienteInterface';
import { useMemo, useState } from 'react';
import { ApiService } from 'data/services/ApiService';

export default function UseIndex() {
  const [pacientes, setPacientes] = useState<PacienteInterface[]>([]),
    [pined, setPined] = useState<PacienteInterface>(null),
    [more, setMore] = useState(''),
    [bool, setBool] = useState(false),
    [erro, setErro] = useState(''),
    [loading, setLoading] = useState(false),
    [numberPatients, setNumberPatients] = useState('5'),
    [idPined, setIdPined] = useState('-1'),
    [funcPatient, setFuncPatient] = useState<any>(null),
    [funcPatients, setFuncPatients] = useState<any>(null);

  function seeMore(index: number) {
    if (more === index.toString()) {
      setMore('');
    } else {
      setMore(index.toString());
    }
  }
  function changeNumberPatients() {
    clearInterval(funcPatients);
    setFuncPatients(
      setInterval(() => {
        getPatients(numberPatients);
      }, 5000)
    );
  }

  async function getPatient(id: string) {
    try {
      const { data } = await ApiService.get<PacienteInterface>(
        `/patient/${id}`
      );
      setPined(data);
      console.log(data);
    } catch {
      setErro('Errou ao pinar o paciente');
    }
  }

  async function getPatients(numberPatients) {
    setErro('');
    try {
      const { data } = await ApiService.get<PacienteInterface[]>(
        `/patients/${numberPatients}`
      );
      setPacientes(data);
    } catch (e) {
      setErro('Erro ao atualizar os pacientes');
    }
    // setPacientes([
    //   {
    //     id: '1020',
    //     state: 'Estável',
    //     sensor: {
    //       temperature: '30',
    //       respiratoryRate: '10',
    //       heartRate: '80',
    //       bloodOxygenation: '99',
    //       arterialPressure: '110',
    //     },
    //   },
    //   {
    //     id: '1040',
    //     state: 'Estável',
    //     sensor: {
    //       temperature: '30',
    //       respiratoryRate: '10',
    //       heartRate: '80',
    //       bloodOxygenation: '99',
    //       arterialPressure: '110',
    //     },
    //   },
    // ]);
  }

  return {
    pined,
    pacientes,
    getPatient,
    more,
    seeMore,
    bool,
    getPatients,
    numberPatients,
    erro,
    loading,
    idPined,
    setFuncPatient,
    funcPatient,
    funcPatients,
    setFuncPatients,
    changeNumberPatients,
    setIdPined,
    setPined,
    setBool,
    setNumberPatients,
  };
}
