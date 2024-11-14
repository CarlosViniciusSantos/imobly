import { create } from "zustand";

export const useLoginStore = create((set) => ({
    id: null,
    nome: '',
    cpf: '',
    telefone: '',
    cidade: '',
    estado: '',
    foto_perfil: '',
    data_criacao: '',
    email: '',
    senha: '',
    accessToken: '',

    login: (userLogin) => set({ ...userLogin }),
    logout: () => set({
        id: null,
        nome: '',
        cpf: '',
        telefone: '',
        cidade: '',
        estado: '',
        foto_perfil: '',
        data_criacao: '',
        email: '',
        senha: '',
        accessToken: ''
    }),
    updateUser: (updatedUser) => set((state) => ({
        ...state,
        ...updatedUser
    }))
}));