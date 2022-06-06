<%@ WebHandler Language="VB" Class="CCMPROG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCMPROG : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_PIDM As String
    
    Dim p_SCSL_CODE, p_DCTO_TIPO, p_DCTO_CODE, p_FECHA_ANTERIOR, p_FECHA_COBRANZA As String
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Dim ccCuentaPorCobrar As New NOMADE.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New NOMADE.NC.NCEmpresa("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
   
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
               
        p_FECHA_ANTERIOR = context.Request("p_FECHA_ANTERIOR")
        p_FECHA_COBRANZA = context.Request("p_FECHA_COBRANZA")
        p_DCTO_TIPO = context.Request("p_DCTO_TIPO")
        p_DCTO_CODE = context.Request("p_DCTO_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        
        If p_SCSL_CODE = "" Then
            p_SCSL_CODE = Nothing
        End If
        
        Try
        
            Select Case OPCION
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", context.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'lista eventos cobranza
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarDeudasCobrarCliente(p_CTLG_CODE, "N", "A", "0")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            'Requeridos
                            resb.Append("""title"" :" & """" & MiDataRow("CLIENTE").ToString & """,")
                            resb.Append("""start"" :" & """" & MiDataRow("FECHA_COBRANZA").ToString & "T" & MiDataRow("HORA_COBRANZA").ToString & """,")
                            resb.Append("""id"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            'Personalizados
                            resb.Append("""ctlg"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""scsl"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""emision"" :" & """" & MiDataRow("FECHA_EMISION").ToString & """,")
                            resb.Append("""fecha_cobranza"" :" & """" & MiDataRow("FECHA_COBRANZA").ToString & "T" & MiDataRow("HORA_COBRANZA").ToString & """,")
                            resb.Append("""hora_cobranza"" :" & """" & MiDataRow("HORA_COBRANZA").ToString & """,")
                            resb.Append("""cliente"" :" & """" & MiDataRow("CLIENTE").ToString & """,")
                            resb.Append("""documento"" :" & """" & MiDataRow("DOCUMENTO").ToString & """,")
                            resb.Append("""monto"" :" & """" & MiDataRow("MONTO_MONE_BASE").ToString & """,")
                            resb.Append("""deuda"" :" & """" & MiDataRow("DEUDA_BASE").ToString & """,")
                            resb.Append("""amortizado"" :" & """" & MiDataRow("AMORTIZADO_MONE_BASE").ToString & """,")
                            resb.Append("""codigo"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""tipo"" :" & """" & MiDataRow("TIPO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2" 'Grabar postergación de cobranza y actualizar fecha de cobranza del documento
                    Dim msg As Array
                    msg = ccCuentaPorCobrar.CrearPostergacionCobro(p_DCTO_TIPO, p_DCTO_CODE, p_CTLG_CODE, p_SCSL_CODE, p_FECHA_ANTERIOR, p_FECHA_COBRANZA, p_DCTO_TIPO, p_USUA_ID)
                    res = msg(0)
                                   
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
  
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class