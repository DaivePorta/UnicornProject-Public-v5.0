using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nomade.Efact.LogDatos
{
    public class cEFBajaND
    {
        private Connection cn;

        public cEFBajaND(String str)
        {
            this.cn = new Connection(str);
        }

        public DataTable fnListarID(string p_CTLG_CODE, string p_ND_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_ND_ID", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("p_ND_CODE", p_ND_CODE, ParameterDirection.Input, (DbType)253, 0));

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
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_ND_DATOS_EMP", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosDoc(string p_CTLG_CODE, string p_ND_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_COM_BAJA_ND_DATOS_DOC", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("p_ND_CODE", p_ND_CODE, ParameterDirection.Input, (DbType)253, 0));

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
    }
}
