'use strict'

const { uuid } = require('uuidv4')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    const RegulacaoDep = await queryInterface.sequelize.query('select * from area where nome = \'Regulação\'')
    const AdmDep = await queryInterface.sequelize.query('select * from area where nome = \'Administrativo\'')
    const ProcessosDep = await queryInterface.sequelize.query('select * from area where nome = \'Processos\'')
    const EquipeDep = await queryInterface.sequelize.query('select * from area where nome = \'Equipe Técnica\'')
    const CopegDep = await queryInterface.sequelize.query('select * from area where nome = \'Copeg\'')
    const EadDep = await queryInterface.sequelize.query('select * from area where nome = \'NEAD\'')
    const BibliDep = await queryInterface.sequelize.query('select * from area where nome = \'Biblioteca\'')
   
    await queryInterface.bulkInsert('subarea', [{
      id: uuid(),
      nome: 'ESTÁGIO - CONVENIOS',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'APRENDIZAGEM',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'APROVEITAMENTO DE ESTUDOS',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'RENOVAÇÃO DE RESPONSABILIDADE TÉCNICA',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'ATO AUTORIZATIVO',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: '1º CADASTRO SISTEC',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'DÚVIDAS E QUESTIONAMENTOS',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: RegulacaoDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'SIG (CADASTRO, LIBERAÇÃO, ALTERAÇÃO, CONSULTA) - DEMADAS DA EQUIPE TÉCNICA',
      fkArea: AdmDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: AdmDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'CONTRATOS',
      fkArea: ProcessosDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'MANUAIS DE REFERÊNCIA / ESPECIFICAÇÃO TÉCNICA',
      fkArea: ProcessosDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PROJETOS ',
      fkArea: ProcessosDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'MMXM',
      fkArea: ProcessosDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: ProcessosDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PLANOS DE CURSO E AÇÕES EXTENSIVAS – ELABORAÇÃO / ATUALIZAÇÃO / ALTERAÇÃO',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PROJETOS – ELABORAÇAO / REVISÃO',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PARECERES',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'APROVEITAMENTO DE ESTUDOS',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'DÚVIDAS E ORIENTAÇÕES PEDAGÓGICAS',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'FORMAÇÃO',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'INTEGRAÇÃO',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'CADASTRO DN',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'CONSULTA – EXTRANET, CBO, DN E SIG',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'ATENDIMENTO CAS',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: EquipeDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'SEGURO – CONTRATO🡪 UNIDADE',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'CURRÍCULOS',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'VISITA TÉCNICA AS UNIDADES',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'RELATÓRIOS MENSAIS',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PLANILHA DE CADASTRO E SOLICITAÇÃO DE CURRÍCULOS (SOLICITADO DAS UNIDADES)',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'DIVULGAÇÃO / GERCOM',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: CopegDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'RELATÓRIO DE PRODUÇÃO – ENVIADO A GPG, UNIDS POLO E COMERCIAL',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'RELATÓRIO FINACEIRO – ENVIADO A GPG, GF E UNIDADES POLOS',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OFERTA PSG (LEVANTAMENTO E PROPOSIÇÃO) - DIREÇÃO DEP / DPE / UNIDS POLOS/COMERCIAL',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PLANILHAS MONITORAMENTO',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PLANO DE VENDAS – GPG / UNIDS POLO/ COMERCIAL / GERCOM',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'ESTÁGIO CURSO TECNICO – UNID. POLO / REGULAÇÃO / NEAD',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PROGRAMA APRENDIZAGEM –(DOCUMENTAÇÃO) – UNIDS POLOS',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PLANO DE COMUNICAÇÃO',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: EadDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'LEVANTAMENTOE ATUALIZAÇÃO BIBLIOGRÁFICA',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'SOLICIAÇÃO DE LIVROS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'DOAÇÃO LIVROS (EVENTOS)',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'GESTÃO DO ACERVO',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'PROCESSAMENTO TÉCNICO',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'CONTROLE DE CIRCULAÇÃO MATERIAL',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'GESTÃO DA UNIDS BIBIOTECÁRIAS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'GESTÃO DA UNIDS BIBIOTECÁRIAS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'GESTÂO DE PROJETOS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'GESTÃO BIBLIOTECA DIGITAL',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'VENDA DE LIVROS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      id: uuid(),
      nome: 'OUTROS',
      fkArea: BibliDep[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    
    
    
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('subarea', null, {})
  }
}
