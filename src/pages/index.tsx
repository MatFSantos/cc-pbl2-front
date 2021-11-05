import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Tooltip,
  Collapse,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import {
  CheckCircleOutline,
  CheckCircle,
  Face,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@material-ui/icons';
import UseIndex from 'data/hooks/pages/useIndex';
import React, { useEffect } from 'react';
import {
  ContainerList,
  ContainerFixed,
  InformationPacient,
  ContainerApp,
  ListStyle,
} from 'ui/styles/pages/index.style';
import DataPacient from 'ui/components/DataPacient/DataPacient';

export default function Home() {
  const {
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
    setFuncPatients,
    funcPatients,
    setIdPined,
    setPined,
    setBool,
    setNumberPatients,
    changeNumberPatients,
  } = UseIndex();

  useEffect(() => {
    getPatients(numberPatients);
    setFuncPatients(
      setInterval(() => {
        getPatients(numberPatients);
      }, 10000)
    );
  }, []);
  useEffect(() => {
    if (idPined != '-1') {
      if (funcPatient != null) {
        clearInterval(funcPatient);
      }

      setFuncPatient(
        setInterval(() => {
          getPatient(idPined);
        }, 3000)
      );
    } else {
      if (funcPatient != null) {
        clearInterval(funcPatient);
      }
      setPined(null);
      setBool(false);
    }
  }, [idPined]);
  return (
    <ContainerApp>
      <ContainerFixed
        in={bool}
        sx={
          pined
            ? pined.state === 'Grave'
              ? { backgroundColor: '#ff0000b2' }
              : { backgroundColor: '#008a0090' }
            : { backgroundColor: 'white' }
        }
        timeout={500}
      >
        {pined ? (
          <>
            <InformationPacient>
              <Avatar>
                <Face />
              </Avatar>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat',
                }}
              >
                {pined.id}
              </Typography>
              <Typography sx={{ color: 'white', fontFamily: 'Montserrat' }}>
                {pined.state}
              </Typography>
            </InformationPacient>
            <DataPacient
              paciente={pined}
              variant={'small'}
              see={'inline'}
              text={'white'}
              box={'1px 0 10px black'}
            />
          </>
        ) : (
          ''
        )}
      </ContainerFixed>
      <ContainerList>
        <div>
          <TextField
            onChange={(event) => setNumberPatients(event.target.value)}
            value={numberPatients}
            type={'number'}
            style={{ padding: '15px' }}
            required
          />
          <Button
            variant={'contained'}
            onClick={() => changeNumberPatients()}
            style={{ margin: '20px 15px 15px 0' }}
            disabled={!numberPatients}
          >
            Alterar
          </Button>
        </div>
        <Typography
          variant={'h3'}
          sx={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}
        >
          Lista de Pacientes
        </Typography>
        <ListStyle>
          {pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <ListItem
                key={index}
                sx={
                  paciente.state === 'Grave'
                    ? { backgroundColor: '#ff0000b2' }
                    : { backgroundColor: '#008a0090' }
                }
              >
                <Tooltip title={paciente.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <Face />
                    </Avatar>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={paciente.id}
                  secondary={
                    <Tooltip
                      title={more === index.toString() ? 'Menos' : 'Mais'}
                    >
                      <IconButton
                        onClick={() => seeMore(index)}
                        sx={{ color: 'black' }}
                      >
                        {more === index.toString() ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </Tooltip>
                  }
                  primaryTypographyProps={{
                    color: 'white',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                  }}
                />
                <Collapse in={more === index.toString()} timeout={500}>
                  <DataPacient
                    paciente={paciente}
                    variant={'small'}
                    see={more === index.toString() ? 'inline' : 'none'}
                    text={'white'}
                  />
                </Collapse>
                <Typography color={'white'} fontFamily={'Montserrat'}>
                  {paciente.state}
                </Typography>
                <ListItemSecondaryAction>
                  <Tooltip title={pined === paciente ? 'Desfixar' : 'Fixar'}>
                    <IconButton
                      edge="end"
                      aria-label={pined === paciente ? 'Desfixar' : 'Fixar'}
                      onClick={() => {
                        if (idPined === paciente.id) {
                          setIdPined('-1');
                          setBool(false);
                          setPined(null);
                        } else {
                          setIdPined(paciente.id);
                          setPined(paciente);
                          setBool(true);
                        }
                      }}
                      sx={{ color: 'black' }}
                    >
                      {idPined === paciente.id ? (
                        <CheckCircle />
                      ) : (
                        <CheckCircleOutline />
                      )}
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>Nenhum paciente cadastrado</Typography>
          )}
        </ListStyle>
      </ContainerList>
    </ContainerApp>
  );
}
