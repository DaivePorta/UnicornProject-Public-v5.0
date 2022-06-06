using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Nomade.Efact.LogDatos
{
    public class cEFBoleta
    {
        private Connection cn;

        public cEFBoleta(String str)
        {
            this.cn = new Connection(str);
        }

        public DataTable fnListarDoc(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_LISTAR_BOL", CommandType.StoredProcedure);
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

        public DataTable fnListarDocAnticipo(string p_CTLG_CODE, string p_FVRANTI_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_LISTAR_ANTICIPO_BOLETA_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_FVRANTI_CODE", p_FVRANTI_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarDatosDocumento(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOSDOC", CommandType.StoredProcedure);
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

        
        public DataTable fnListarDatosDocumentoOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOSDOC_ORBITUM", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosBoletaAnticipoOrbitum(string p_CTLG_CODE, string p_FVRANTI_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_ANTI_DATOSDOC_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_FVRANTI_CODE", p_FVRANTI_CODE, ParameterDirection.Input, (DbType)253, 0));

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

        public DataTable fnListarPuntoPartida(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_PUNTO_PARTIDA", CommandType.StoredProcedure);
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

        public DataTable fnListarGuiaRemision(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_GUIAS", CommandType.StoredProcedure);
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
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOS_EMPRESA", CommandType.StoredProcedure);
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
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_ANTI_DATOS_EMPRESA", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosCliente(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOS_CLIENTE", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosProducto(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOS_PRODUCTO", CommandType.StoredProcedure);
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

        public DataTable fnListarDatosProductoOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DATOS_PRODUCTO_ORBITUM", CommandType.StoredProcedure);
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

        
        public DataTable fnListarDetalleAnticipoOrbitum(string p_CTLG_CODE, string p_FVRANTI_CODE, string p_TIPO_DCTO)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("EFAC_BOL_DETALLE_ANTICIPO_ORBITUM", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_FVRANTI_CODE", p_FVRANTI_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, (DbType)253, 0));

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
