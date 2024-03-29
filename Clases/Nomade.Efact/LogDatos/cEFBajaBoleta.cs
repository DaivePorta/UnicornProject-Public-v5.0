﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nomade.Efact.LogDatos
{
    public class cEFBajaBoleta
    {
        private Connection cn;

        public cEFBajaBoleta(String str)
        {
            this.cn = new Connection(str);
        }


        public DataTable fnListarID(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_BOL_ID", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, (DbType)253, 0));

                DataTable oDataTable = new DataTable();
                oDataTable = this.cn.Consulta(newCommand);
                if (oDataTable == null)
                    return null;
                else if (oDataTable.Rows.Count == 0)
                    return null;
                else
                    return oDataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable fnListarDatosEmpresa(string p_CTLG_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_BOL_DATOS_EMP", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));

                DataTable oDataTable = new DataTable();
                oDataTable = this.cn.Consulta(newCommand);
                if (oDataTable == null)
                    return null;
                else if (oDataTable.Rows.Count == 0)
                    return null;
                else
                    return oDataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable fnListarDatosDoc(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_BOL_DATOS_DOC", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, (DbType)253, 0));

                DataTable oDataTable = new DataTable();
                oDataTable = this.cn.Consulta(newCommand);
                if (oDataTable == null)
                    return null;
                else if (oDataTable.Rows.Count == 0)
                    return null;
                else
                    return oDataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable fnInsertarBaja(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EBOL_COM_BAJA_INSERTAR", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, (DbType)253, 0));

                DataTable oDataTable = new DataTable();
                oDataTable = this.cn.Consulta(newCommand);
                if (oDataTable == null)
                    return null;
                else if (oDataTable.Rows.Count == 0)
                    return null;
                else
                    return oDataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable fnListarDatosComBaja(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_FACT_DATOS", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, (DbType)253, 0));

                DataTable oDataTable = new DataTable();
                oDataTable = this.cn.Consulta(newCommand);
                if (oDataTable == null)
                    return null;
                else if (oDataTable.Rows.Count == 0)
                    return null;
                else
                    return oDataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string fnActualizar_ELECT_IND_VTA(string p_CTLG_CODE, string p_VTAC_CODE, string p_ELECT_IND)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_ACTUALIZAR_ELECT_IND_VTA", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ELECT_IND", p_ELECT_IND, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_RPTA", string.Empty, ParameterDirection.Output, (DbType)253, 0));
                newCommand = cn.Ejecuta_parms(newCommand);

                string sRpta = ((IDataParameter)newCommand.Parameters["@p_RPTA"]).Value.ToString();
                return sRpta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
