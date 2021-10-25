import axios from 'axios';

const BASE_URL = "https://webapp-sampleapp-rm84281.azurewebsites.net/api/user"

export const create = async (nome, email, senha, estado, cidade, bairro, logradouro, numero, cep) => {
  return axios({
    method: 'post',
    url: BASE_URL,
    data: {
      nome,
      email,
      senha,
      endereco: {
        estado,
        cidade,
        bairro,
        logradouro,
        numero,
        cep
      }
    }
  })
}

export const findOne = async (id) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/${id}`
  })
}

export const findByEmail = async (email) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/email/${email}`
  })
}