using System;
using System.Data;
//DPORTA 07/05/2022
namespace Nomade.Efact
{
    public class cEFGuiaRemision
    {
        private Connection cn;

        public cEFGuiaRemision(String str)
        {
            this.cn = new Connection(str);
        }

        public DataTable fnListarDoc(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_LISTAR_FACT", CommandType.StoredProcedure);
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
        public DataTable fnListarDatosGuiaElectDocumentoOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_GUIA_ELECT_DATOSDOC_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
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
        public DataTable fnListarDatosGuiaElectDetOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_GUIA_ELECT_DETALLE_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
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
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_FACT_DATOS_EMPRESA", CommandType.StoredProcedure);
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
        public string fnActualizar_ELECT_IND_GUIA_REMI(string p_CTLG_CODE, string p_VTAC_CODE, string p_ELECT_IND)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_ACTUALIZAR_ELECT_IND_GUIA_REMI", CommandType.StoredProcedure);
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
