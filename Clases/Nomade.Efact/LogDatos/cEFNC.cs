using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nomade.Efact.LogDatos
{
    public class cEFNC
    {
        private Connection cn;

        public cEFNC(String str)
        {
            this.cn = new Connection(str);
        }

        public DataTable fnListarDoc(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_LISTAR_NC", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosDocumento(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOSDOC", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        
        public DataTable fnListarDatosDocumentoOrbitum(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOSDOC_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_EMPRESA", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosNuevoEmpresa(string p_CTLG_CODE, string p_SCSL_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_NUEVO_EMPRESA", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosCliente(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_CLIENTE", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosDocRef(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_DOC_REF", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosProducto(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_PRODUCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosProductoOrbitum(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_PRODUCTO_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosModoPagoOrbitum(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_MODO_PAGO_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosAdicionalCabOrbitum(string p_CTLG_CODE, string p_NC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_NC_DATOS_ADICIONAL_CAB_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public string fnActualizar_ELECT_IND_NC(string p_CTLG_CODE, string p_NC_CODE, string p_ELECT_IND)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_ACTUALIZAR_ELECT_IND_NC", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NC_CODE", p_NC_CODE, ParameterDirection.Input, (DbType)253, 0));
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
