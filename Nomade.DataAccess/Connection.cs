// Decompiled with JetBrains decompiler
// Type: Nomade.Connection
// Assembly: Nomade.DataAccess, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: C6A9DC0C-602E-4FA6-908E-1EE36DC5D659
// Assembly location: D:\_USUARIOS ORBITUM\_SRONCAL\ElNomade V.3.0\ElNomade 3.0\Nomade V4\Bin\Nomade.DataAccess.dll

using Microsoft.VisualBasic.CompilerServices;
using MySql.Data.MySqlClient;
using System;
using System.Configuration;
using System.Data;
using System.Web;
using Microsoft.VisualBasic;
using System.Runtime.CompilerServices;

namespace Nomade
{
  public class Connection : IDisposable
  {
    private MySqlConnection m_CN;
    private MySqlDataAdapter m_DA;
    private MySqlCommand m_CMD;
    //private MySqlDataReader m_DR;
    private string m_tipo;
    private bool disposed;
    private string strCN;
    private string strCNBanner;

    public IDbConnection CN
    {
      get
      {
        return (IDbConnection) this.m_CN;
      }
    }

    public string str_CNbanner
    {
      get
      {
        return this.strCNBanner;
      }
    }

    public string str_CNweb
    {
      get
      {
        return this.strCN;
      }
    }

    public string set_cadena
    {
      set
      {
        this.m_CN.ConnectionString = value;
      }
    }

    public Connection()
    {
      this.m_tipo = "web";
      this.disposed = false;
      this.strCN = "data source = ServidorSQL; initial catalog = BaseDatos; user id = Usuario; password = Contraseña";
      this.strCNBanner = ConfigurationManager.AppSettings["cnn_string"];
      this.m_CN = new MySqlConnection(this.strCN);
    }

    public Connection(string strcn1)
    {
      this.m_tipo = "web";
      this.disposed = false;
      this.strCN = "data source = ServidorSQL; initial catalog = BaseDatos; user id = Usuario; password = Contraseña";
      this.strCNBanner = ConfigurationManager.AppSettings["cnn_string"];
      this.m_tipo = strcn1;
      this.m_CN = new MySqlConnection(this.strCNBanner);
    }

    ~Connection()
    {
      this.Dispose(false);
    }

    public DataTable Consulta(string strSQL)
    {
      try
      {
        this.m_DA = new MySqlDataAdapter(strSQL, this.m_CN);
        DataTable DT = new DataTable();
        this.m_DA.Fill(DT);
        return this.CheckDT(ref DT);
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public DataTable Consulta(IDbCommand CMD)
    {
      try
      {
        this.m_DA = new MySqlDataAdapter((MySqlCommand) CMD);
        DataTable DT = new DataTable();
        this.m_DA.Fill(DT);
        return this.CheckDT(ref DT);
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public DataSet Consulta(IDbCommand CMD, short inicio, int fin)
    {
      try
      {
        this.m_DA = new MySqlDataAdapter((MySqlCommand) CMD);
        DataSet dataSet = new DataSet();
        this.m_DA.Fill(dataSet, (int) inicio, fin, "Logs");
        return dataSet;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public bool Ejecuta(string strSQL)
    {
      try
      {
        this.m_CMD = new MySqlCommand(strSQL, this.m_CN);
        MySqlCommand mySqlCommand = this.m_CMD;
        mySqlCommand.Connection.Open();
        mySqlCommand.ExecuteNonQuery();
        mySqlCommand.Connection.Close();
        return true;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public string Ejecuta_dame_valor(string strSQL)
    {
      try
      {
        this.m_CMD = new MySqlCommand(strSQL, this.m_CN);
        MySqlCommand mySqlCommand = this.m_CMD;
        mySqlCommand.Connection.Open();
        string str = Conversions.ToString(mySqlCommand.ExecuteNonQuery());
        mySqlCommand.Connection.Close();
        return str;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        Exception exception = ex;
        Conversions.ToString(-1);
        throw exception;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public bool Ejecuta(IDbCommand CMD)
    {
      bool flag;
      try
      {
        IDbCommand dbCommand = CMD;
        dbCommand.Connection.Open();
        dbCommand.ExecuteNonQuery();
        dbCommand.Connection.Close();
        flag = true;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        flag = false;
        ProjectData.ClearProjectError();
      }
      finally
      {
        this.CloseConnection();
      }
      return flag;
    }

    public string Ejecuta_string(IDbCommand CMD)
    {
      string str;
      try
      {
        IDbCommand dbCommand = CMD;
        dbCommand.Connection.Open();
        dbCommand.ExecuteNonQuery();
        dbCommand.Connection.Close();
        str = "OK";
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        str = ex.Message;
        ProjectData.ClearProjectError();
      }
      finally
      {
        this.CloseConnection();
      }
      return str;
    }

    public IDbCommand Ejecuta_parms(IDbCommand CMD)
    {
      try
      {
        IDbCommand dbCommand = CMD;
        dbCommand.Connection.Open();
        dbCommand.ExecuteNonQuery();
        dbCommand.Connection.Close();
        return CMD;
      }
      catch (MySqlException ex)
      {
        ProjectData.SetProjectError((Exception) ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public string Ejecuta_dame_valor(IDbCommand CMD)
    {
      try
      {
        IDbCommand dbCommand = CMD;
        dbCommand.Connection.Open();
        string str = Conversions.ToString(dbCommand.ExecuteScalar());
        dbCommand.Connection.Close();
        return str;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        throw ex;
      }
      finally
      {
        this.CloseConnection();
      }
    }

    public bool CanConnect()
    {
      bool flag;
      try
      {
        this.m_CN.Open();
        this.m_CN.Close();
        flag = true;
      }
      catch (Exception ex)
      {
        ProjectData.SetProjectError(ex);
        flag = false;
        ProjectData.ClearProjectError();
      }
      return flag;
    }

    public IDbCommand GetNewCommand(string cmdText, CommandType TipoCMD)
    {
      return (IDbCommand) new MySqlCommand(cmdText, this.m_CN)
      {
        CommandType = TipoCMD
      };
    }

    public IDataParameter GetNewParameter(string ParameterName, object Value, ParameterDirection Direction, DbType DbType, int Size = 0)
    {
      MySqlParameter mySqlParameter = new MySqlParameter();
      mySqlParameter.ParameterName = ParameterName;
      mySqlParameter.Direction = Direction;
      mySqlParameter.MySqlDbType = (MySqlDbType) DbType;
      mySqlParameter.Value = RuntimeHelpers.GetObjectValue(Value);
      if (Size > 0)
        mySqlParameter.Size = Size;
      return (IDataParameter) mySqlParameter;
    }

    public IDbDataAdapter GetNewDataAdapter(string cmdText)
    {
      return (IDbDataAdapter) new MySqlDataAdapter(cmdText, this.m_CN);
    }

    public void Dispose()
    {
      this.Dispose(true);
      GC.SuppressFinalize((object) this);
    }

    protected virtual void Dispose(bool disposing)
    {
      if (!this.disposed && disposing)
      {
        this.Apaga((object) this.m_CN, true);
        this.Apaga((object) this.m_CMD, true);
        this.Apaga((object) this.m_DA, true);
      }
      this.disposed = true;
    }

    private void Apaga(object obj, bool CanDispose = true)
    {
      if (obj != null && CanDispose)
        NewLateBinding.LateCall(obj, (Type) null, "dispose", new object[0], (string[]) null, (Type[]) null, (bool[]) null, true);
      obj = (object) null;
    }

    private void CloseConnection()
    {
      if (this.m_CN.State != ConnectionState.Open)
        return;
      this.m_CN.Close();
    }

    public void CloseConnection1()
    {
      if (this.m_CN.State != ConnectionState.Open)
        return;
      this.m_CN.Close();
    }

    private void OpenConnection()
    {
      if (this.m_CN.State == ConnectionState.Open)
        return;
      this.m_CN.Open();
    }

    private DataTable CheckDT(ref DataTable DT)
    {
      if (DT == null)
        return (DataTable) null;
      if (DT.Rows.Count != 0)
        return DT;
      this.Apaga((object) DT, true);
      return (DataTable) null;
    }

		public MySqlConnection fnAbrirConexion(ref MySqlConnection oSqlConnection)
		{
			try
			{
				string sCadConexion = this.m_CN.ConnectionString;
				oSqlConnection.ConnectionString = sCadConexion;
				oSqlConnection.Open();
				MySqlConnection oSqlConnection2 = new MySqlConnection();
				oSqlConnection2 = oSqlConnection;
				return oSqlConnection2;
			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}
	}
}
