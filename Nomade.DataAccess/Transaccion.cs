using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Xml;
using System.Data;
using System.Configuration;

namespace Nomade.DataAccess
{
	public class Transaccion
	{
		private string sCadenaConexion;
		private MySqlConnection oMySqlConnection;
		public Connection oConnection;
		private MySqlTransaction oSqlTransaction;
		private MySqlCommand oMySqlCommand;
		private eIsolationLevel iIsolationLevel;
		public eTransactionState iTransactionState;

		public Transaccion()
		{
			try
			{		
				this.sCadenaConexion = ConfigurationManager.AppSettings["cnn_string"]; ;	

			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		public void fnBeginTransaction(eIsolationLevel eIsolationLevel)
		{
			try
			{
				this.oMySqlConnection = new MySqlConnection();
				this.oConnection = new Connection("NM");
				this.oConnection.fnAbrirConexion(ref this.oMySqlConnection);
				this.oSqlTransaction = this.oMySqlConnection.BeginTransaction();

				this.iIsolationLevel = eIsolationLevel;
				string sIsolationLevel = fnGetIsolationLevel(this.iIsolationLevel).Trim();
				this.oMySqlCommand = new MySqlCommand(sIsolationLevel, this.oMySqlConnection);
				this.oMySqlCommand.Connection = this.oMySqlConnection;
				this.oMySqlCommand.CommandType = CommandType.Text;
				this.oMySqlCommand.Transaction = this.oSqlTransaction;
				this.iTransactionState = eTransactionState._ON;
			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		public void fnCommitTransaction()
		{
			try
			{
				this.oSqlTransaction.Commit();
				if (this.oMySqlConnection.State == ConnectionState.Open)
					this.oMySqlConnection.Close();
				this.oMySqlConnection = null;
				this.oMySqlCommand = null;
				this.oSqlTransaction = null;
				this.iTransactionState = eTransactionState._OFF;
			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		public void fnRollBackTransaction()
		{
			try
			{
				this.oSqlTransaction.Rollback();
				if (this.oMySqlConnection.State == ConnectionState.Open)
					this.oMySqlConnection.Close();
				this.oMySqlConnection = null;
				this.oMySqlCommand = null;
				this.oSqlTransaction = null;
				this.oConnection = null;
				this.iTransactionState = eTransactionState._OFF;
			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		public void fnExecute(string sConsultaSQL)
		{
			try
			{
				this.oMySqlCommand.CommandText = sConsultaSQL.Trim();
				this.oMySqlCommand.ExecuteNonQuery();
			}
			catch (Exception ex)
			{
				this.fnRollBackTransaction();
				throw (ex);
			}
		}

		public DataTable fnExecute_GetDataTable(string sConsultaSQL, eTimeOut eTiempoExpira = eTimeOut.Inicial)
		{
			try
			{
				DataTable oDT = new DataTable();
				oDT.TableName = "TablaSQL";
				this.oMySqlCommand.CommandType = CommandType.Text;
				this.oMySqlCommand.CommandText = sConsultaSQL.Trim();
				if (eTiempoExpira != eTimeOut.Inicial)
					this.oMySqlCommand.CommandTimeout = (int)eTiempoExpira;
				oDT.Load(this.oMySqlCommand.ExecuteReader());
				return oDT;
			}
			catch (Exception ex)
			{
				this.fnRollBackTransaction();
				throw (ex);
			}
		}

		public void fnExecute_StoreProcedure(ref MySqlCommand oMySqlCommandSP)
		{
			try
			{
				oMySqlCommandSP.Connection = this.oMySqlConnection;
				oMySqlCommandSP.Transaction = this.oSqlTransaction;
				oMySqlCommandSP.ExecuteNonQuery();
			}
			catch (Exception ex)
			{
				this.fnRollBackTransaction();
				throw (ex);
			}
		}

		public DataTable fnExecute_GetDataTable_StoreProcedure(ref MySqlCommand oMySqlCommandSP, eTimeOut eTiempoExpira = eTimeOut.Inicial, int iIndice = 0)
		{
			try
			{
				DataTable oDT = new DataTable();
				oDT.TableName = "TablaSQL";
				oMySqlCommandSP.Connection = this.oMySqlConnection;
				oMySqlCommandSP.Transaction = this.oSqlTransaction;
				if (eTiempoExpira != eTimeOut.Inicial)
					oMySqlCommandSP.CommandTimeout = (int)eTiempoExpira;

				DataSet ds = new DataSet();
				MySqlDataAdapter da = new MySqlDataAdapter(oMySqlCommandSP);
				da.Fill(ds);
				oDT = ds.Tables[iIndice];

				ds.Dispose();
				da.Dispose();
				return oDT;
			}
			catch (Exception ex)
			{
				this.fnRollBackTransaction();
				throw (ex);
			}
		}

		private string fnGetIsolationLevel(eIsolationLevel eIsolationLevel)
		{
			try
			{
				if (eIsolationLevel == eIsolationLevel.READ_UNCOMMITTED)
					return "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
				else if (eIsolationLevel == eIsolationLevel.READ_COMMITTED)
					return "SET TRANSACTION ISOLATION LEVEL READ COMMITTED";
				else if (eIsolationLevel == eIsolationLevel.REPEATABLE_READ)
					return "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ";
				else if (eIsolationLevel == eIsolationLevel.SNAPSHOT)
					return "SET TRANSACTION ISOLATION LEVEL SNAPSHOT";
				else if (eIsolationLevel == eIsolationLevel.SERIALIZABLE)
					return "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE";
				else
					throw new Exception("Se produjeron errores al definir el nivel de aislamiento.");
			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		public enum eIsolationLevel
		{
			READ_UNCOMMITTED,
			READ_COMMITTED,
			REPEATABLE_READ,
			SNAPSHOT,
			SERIALIZABLE,
		}

		public enum eTimeOut
		{
			Indefinido = 0,
			Inicial = 15,
			s30 = 30,
			s45 = 45,
			s60 = 60,
			s120 = 120,
		}

		public enum eTransactionState
		{
			_OFF,
			_ON
		}


		private string leeXML()
		{
			XmlDocument xmlDocument = new XmlDocument();
			xmlDocument.Load("config.dll");
			XmlNodeList elementsByTagName1 = ((XmlElement)xmlDocument.GetElementsByTagName("Connection")[0]).GetElementsByTagName("datos");
			string str = "";
			try
			{
				foreach (XmlElement xmlElement in elementsByTagName1)
				{
					XmlNodeList elementsByTagName2 = xmlElement.GetElementsByTagName("srv");
					XmlNodeList elementsByTagName3 = xmlElement.GetElementsByTagName("db");
					str = string.Format("Server={0}; Database={1};Trusted_Connection=Yes;", elementsByTagName2[0].InnerText, elementsByTagName3[0].InnerText);
				}

				return str;
			}
			catch (Exception ex)
			{
				throw (ex);
			}

		}



	}
}

