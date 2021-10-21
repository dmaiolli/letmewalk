import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8080/api/contatos"

export const create = async (nome, ddd, telefone, id) => {
  return axios({
    method: 'post',
    url: BASE_URL,
    data: {
      nome,
      ddd,
      telefone,
      user: {
        id
      }
    }
  })
}

export const findAllByUserId = async (id) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/user/${id}`
  })
}

export const deleteContato = async (id) => {
  return axios({
    method: 'delete',
    url: `${BASE_URL}/${id}`
  })
}

export const update = async (userId, id, nome, ddd, telefone) => {
  return axios({
    method: 'put',
    url: `${BASE_URL}/${id}`,
    data: {
      nome,
      ddd,
      telefone,
      user: {
        id: userId
      }
    }
  })
}
