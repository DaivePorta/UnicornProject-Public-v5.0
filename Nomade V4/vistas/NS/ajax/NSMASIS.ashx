<%@ WebHandler Language="VB" Class="NSMASIS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMASIS : Implements IHttpHandler
    Dim Opcion, Empr, Sucur As String
    Dim resb As New StringBuilder
    Dim res As String
    Dim Asistencia As New Nomade.NS.NSAsistencia("Bn")
    Dim Sucursal As New Nomade.NC.NCSucursal("Bn")
    Dim dt As New DataTable

    Dim p_RHCONAS_CODE As String
    Dim p_RHCONAS_COD_BIO As String
    Dim p_RHCONAS_FECHA As String
    Dim p_RHCONAS_HOR_ENT As String
    Dim p_RHCONAS_HOR_SAL As String
    Dim p_RHCONAS_HOR_ENT_TRAB As String
    Dim p_RHCONAS_HOR_SAL_TRAB As String
    Dim p_RHCONAS_USUA_ID As String
    Dim p_SALIDA As String
    Dim p_RHMANAS_FCOPERI_CODE As String
    Dim p_TIPO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Opcion = context.Request("Opcion")
        Empr = context.Request("Emp")
        Sucur = context.Request("Suc")

        p_RHCONAS_CODE = context.Request("cod")
        p_RHCONAS_COD_BIO = context.Request("bio")
        p_RHCONAS_FECHA = context.Request("fec")
        p_RHCONAS_HOR_ENT = context.Request("he")
        p_RHCONAS_HOR_SAL = context.Request("hs")
        p_RHCONAS_HOR_ENT_TRAB = context.Request("het")
        p_RHCONAS_HOR_SAL_TRAB = context.Request("hst")
        p_RHCONAS_USUA_ID = context.Request("us")

        p_RHMANAS_FCOPERI_CODE = context.Request("peri")
        'p_RHCONAS_USUA_ID = context.Request("Suc")
        'p_SALIDA = context.Request("Suc")

        Try
            Select Case Opcion
                Case "O"
                    res = ""
                    dt = Sucursal.ListarSucursal(Empr, String.Empty, "A")
                    For i = 0 To dt.Rows.Count - 1
                        If res.Equals("") Then
                            res = res + "<option selected='selected' value='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
                        Else
                            res = res + "<option selected='selected' value='" & dt.Rows(i)("CODIGO").ToString() & "'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
                        End If


                    Next
                    'context.Response.ContentType = "text/plain"
                    'context.Response.Write("Hello World")
                Case "L"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Asistencia.Listar_Configuracion(Empr, Sucur)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("RHCONAS_CODE").ToString & """,")
                            resb.Append("""BIOMETRICO"" :" & """" & MiDataRow("RHCONAS_COD_BIO").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("RHCONAS_FECHA").ToString & """,")
                            resb.Append("""HORA_ENTRADA"" :" & """" & MiDataRow("RHCONAS_HOR_ENT").ToString & """,")
                            resb.Append("""HORA_SALIDA"" :" & """" & MiDataRow("RHCONAS_HOR_SAL").ToString & """,")
                            resb.Append("""HORA_ENTRADA_TRABAJADOR"" :" & """" & MiDataRow("RHCONAS_HOR_ENT_TRAB").ToString & """,")
                            resb.Append("""HORA_SALIDA_TRABAJADOR"" :" & """" & MiDataRow("RHCONAS_HOR_SAL_TRAB").ToString & """,")
                            resb.Append("""CATALOGO"" :" & """" & MiDataRow("RHCONAS_CTLG_CODE").ToString & """,")
                            resb.Append("""SUCURSAL"" :" & """" & MiDataRow("RHCONAS_FTVSCSL_CODE").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("RHCONAS_ESTADO_IND").ToString & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("RHCONAS_USUA_ID").ToString & """,")
                            resb.Append("""FECHA_ATIVO"" :" & """" & MiDataRow("RHCONAS_FECHA_ACTV").ToString & " " & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        'resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "M"
                    res = Actualizar_Configuracion(p_RHCONAS_CODE, p_RHCONAS_COD_BIO, p_RHCONAS_FECHA, p_RHCONAS_HOR_ENT,
                                           p_RHCONAS_HOR_SAL, p_RHCONAS_HOR_ENT_TRAB, p_RHCONAS_HOR_SAL_TRAB, p_RHCONAS_USUA_ID,
                                           p_SALIDA)
                Case "D"
                    Dim html As String = ""
                    html = html & "<div id='DIVTABLA' class='portlet-body'>"
                    html = html & "<div id='UNO' class='row-fluid'>"
                    html = html & "<div id='DOS'  class='span12'>"
                    'html = html & "<table id='tblAsistencia' border='0' class='display DTTT_selectable' style='display: block;'>"
                    html = html & "<table id='tblAsistencia' border='0' class='display DTTT_selectable'>"
                    html = html & "<thead>"
                    html = html & "<tr>"

                    html = html & "<th>CÓDIGO</th>"
                    html = html & "<th>NOMBRES</th>"
                    html = html & "<th>FECHA</th>"
                    html = html & "<th>H. ENTRADA</th>"
                    html = html & "<th>H. SALIDA</th>"
                    html = html & "<th>H. E. TRAB.</th>"
                    html = html & "<th>H. S. TRAB.</th>"
                    html = html & "<th>USUARIO</th>"

                    html = html & "</tr>"
                    html = html & "</thead>"

                    dt = Asistencia.Listar_Asistencia(Empr, Sucur, p_RHMANAS_FCOPERI_CODE)


                    If Not dt Is Nothing Then
                        html = html & "<tbody>"
                        For i = 0 To dt.Rows.Count - 1
                            html = html & "<tr>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_CODE_BIO").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_NOMBRE").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_FECHA").ToString().Substring(0, 10) & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_HORA_ENTRADA").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_HORA_SALIDA").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_HORA_ENTRADA_TRABAJADOR").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_HORA_SALIDA_TRABAJADOR").ToString() & "</td>"
                            html = html & "<td>" & dt.Rows(i)("RHMANAS_USUA_ID").ToString() & "</td>"
                            html = html & "</tr>"
                        Next
                        html = html & "</tbody>"
                    Else

                    End If

                    res = html

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
    End Sub

    Public Function Actualizar_Configuracion(ByVal p_RHCONAS_CODE As String, ByVal p_RHCONAS_COD_BIO As String,
                                         ByVal p_RHCONAS_FECHA As String, ByVal p_RHCONAS_HOR_ENT As String,
                                         ByVal p_RHCONAS_HOR_SAL As String, ByVal p_RHCONAS_HOR_ENT_TRAB As String,
                                         ByVal p_RHCONAS_HOR_SAL_TRAB As String, ByVal p_RHCONAS_USUA_ID As String,
                                         ByVal p_SALIDA As String) As String
        Dim cResultado As String = ""
        Try
            cResultado = Asistencia.Actualizar_Configuracion(p_RHCONAS_CODE, p_RHCONAS_COD_BIO, p_RHCONAS_FECHA, p_RHCONAS_HOR_ENT,
                                           p_RHCONAS_HOR_SAL, p_RHCONAS_HOR_ENT_TRAB, p_RHCONAS_HOR_SAL_TRAB, p_RHCONAS_USUA_ID,
                                           p_SALIDA)
        Catch ex As Exception

        End Try
        Return cResultado
    End Function



    Public Function Crear_Asistencia(ByVal p_RHMANAS_CODE As String, ByVal p_RHMANAS_CTLG_CODE As String,
                                      ByVal p_RHMANAS_FTVSCSL_CODE As String, ByVal p_RHMANAS_FCOPERI_CODE As String,
                                      ByVal p_RHMANAS_CODE_BIO As String, ByVal p_RHMANAS_NOMBRE As String,
                                      ByVal p_RHMANAS_FECHA As String, ByVal p_RHMANAS_HORA_ENTRADA As String,
                                      ByVal p_RHMANAS_HORA_SALIDA As String, ByVal p_RHMANAS_HORA_ENTRADA_TRABAJADOR As String,
                                      ByVal p_RHMANAS_HORA_SALIDA_TRABAJADOR As String, ByVal p_RHMANAS_USUA_ID As String,
                                      ByVal p_SALIDA As String, ByVal p_TIPO As String, ByVal p_RHMANAS_FALTA_TRABAJADOR As String, ByVal p_RHMANAS_HORA_EXTRA_TRABAJADOR As String) As String

        Try
            Dim cResultado As String = ""
            cResultado = Asistencia.Crear_Asistencia(p_RHMANAS_CODE, p_RHMANAS_CTLG_CODE, p_RHMANAS_FTVSCSL_CODE, p_RHMANAS_FCOPERI_CODE,
                                       p_RHMANAS_CODE_BIO, p_RHMANAS_NOMBRE, p_RHMANAS_FECHA, p_RHMANAS_HORA_ENTRADA, p_RHMANAS_HORA_SALIDA,
                                       p_RHMANAS_HORA_ENTRADA_TRABAJADOR, p_RHMANAS_HORA_SALIDA_TRABAJADOR, p_RHMANAS_USUA_ID, p_SALIDA, p_TIPO, p_RHMANAS_FALTA_TRABAJADOR, p_RHMANAS_HORA_EXTRA_TRABAJADOR)
            Return cResultado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class