<%@ WebHandler Language="VB" Class="BBMCONF" %>

Imports System
Imports System.Web
Imports System.Data

Public Class BBMCONF : Implements IHttpHandler
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim dtCombo As DataTable
    Dim Comision As New Nomade.BB.BBComisionSistemaPension("Bn")
    Dim Opcion, Codigo, Emp, cm As String

    Dim Parametro As New Nomade.NC.NCParametros("Bn")
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")

        Dim cFecha As String = context.Request("fe")
        Opcion = context.Request("Opcion")
        Codigo = context.Request("codigo")
        Emp = context.Request("Emp")
        'ByVal p_FTCONFI_FCOPERI_CODE As String,
        Dim p_FTCONFI_CODE, p_FTCONFI_DESCRIPCION, p_FTCONFI_ESTADO_IND, p_FTCONFI_USUA_ID, p_FTCONFI_CTLG_CODE,
            p_FTCONFI_PADRE, p_FTCONFI_FCOPERI_CODE, p_FTCONFI_bAFP, p_FTCONFI_bONP, p_FTCONFI_bOTROS, p_FTCONFI_TIPO, p_SALIDA, p_Tipo_Padre As String
        p_FTCONFI_CODE = Codigo
        p_FTCONFI_DESCRIPCION = context.Request("descripcion")
        p_FTCONFI_ESTADO_IND = context.Request("estado")
        p_FTCONFI_USUA_ID = context.Request("usuario")
        p_FTCONFI_CTLG_CODE = context.Request("Emp")
        p_FTCONFI_PADRE = context.Request("padre")
        p_FTCONFI_FCOPERI_CODE = context.Request("periodo")
        p_FTCONFI_bAFP = context.Request("afp")
        p_FTCONFI_bONP = context.Request("onp")
        p_FTCONFI_bOTROS = context.Request("otro")
        p_FTCONFI_TIPO = context.Request("tipo")
        p_Tipo_Padre = context.Request("tipa")
        p_SALIDA = ""
        Try
            Select Case Opcion
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Comision.ListarConfiguracion(Codigo, Emp, cFecha)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTCONFI_CODE").ToString & """,")
                            resb.Append("""COLUMNA"" :" & """" & MiDataRow("FTCONFI_COLUMNA").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("FTCONFI_RHCNPL_CODE").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("FTCONFI_ESTADO_IND").ToString & """,")
                            resb.Append("""PADRE"" :" & """" & MiDataRow("FTCONFI_PADRE_CODE").ToString & """,")
                            resb.Append("""PERIODO"" :" & """" & MiDataRow("FTCONFI_FCOPERI_CODE").ToString & """,")
                            resb.Append("""AFP"" :" & """" & MiDataRow("FTCONFI_bAFP").ToString & """,")
                            resb.Append("""ONP"" :" & """" & MiDataRow("FTCONFI_bONP").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("FTCONFI_TIPO").ToString & """,")
                            resb.Append("""OTROS"" :" & """" & MiDataRow("FTCONFI_bOTROS").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                        res = resb.ToString()
                    End If
                Case "C"

                    cFecha = cFecha.Replace("+", " ")
                    res = Comision.CrearConfiguracion(p_FTCONFI_CODE, p_FTCONFI_DESCRIPCION.ToString().ToUpper, p_FTCONFI_ESTADO_IND,
                                                      p_FTCONFI_USUA_ID, p_FTCONFI_CTLG_CODE, p_FTCONFI_PADRE.ToString().ToUpper, cFecha, p_FTCONFI_bAFP, p_FTCONFI_bONP,
                                                      p_FTCONFI_bOTROS, p_FTCONFI_TIPO, p_SALIDA)
                Case "M"

                    cFecha = cFecha.Replace("+", " ")
                    Dim DT As DataTable = Comision.ListarConfiguracion(p_FTCONFI_CODE, "", "")

                    If DT(0)("FTCONFI_FCOPERI_CODE").ToString().ToUpper().Equals(cFecha) Then

                        res = Comision.ActualizarConfiguracion(p_FTCONFI_CODE, 1, p_FTCONFI_DESCRIPCION.ToString().ToUpper, p_FTCONFI_ESTADO_IND,
                                                     p_FTCONFI_USUA_ID, p_FTCONFI_PADRE.ToString().ToUpper, p_FTCONFI_bAFP, p_FTCONFI_bONP,
                                                     p_FTCONFI_bOTROS, p_FTCONFI_TIPO, p_SALIDA)
                    Else
                        res = "E"

                    End If




                Case "X"
                    Dim Html As String = ""

                    If String.IsNullOrEmpty(cFecha) Then
                        cFecha = String.Empty
                    Else
                        cFecha = cFecha.Replace("+", " ")
                    End If

                    dt = Comision.Listar_Concepto(String.Empty, String.Empty, p_Tipo_Padre, cFecha)
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            Html = Html + "<option value='" & dt.Rows(i)("RHCNPL_CODE_PLAN").ToString & "'>" & dt.Rows(i)("RHCNPL_DESCRIPCION").ToString & "</option>"
                        Next
                    End If
                    res = Html
                Case "Z"
                    Dim Html As String = ""

                    If String.IsNullOrEmpty(cFecha) Then
                        cFecha = String.Empty
                    Else
                        cFecha = cFecha.Replace("+", " ")
                    End If

                    dt = Comision.Listar_Concepto(String.Empty, context.Request("codg"), p_Tipo_Padre, cFecha)
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            Html = Html + "<option value='" & dt.Rows(i)("RHCNPL_CODE_PLAN").ToString & "'>" & dt.Rows(i)("RHCNPL_DESCRIPCION").ToString & "</option>"
                        Next
                    End If
                    res = Html


                Case "P"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable

                    dt = Parametro.ListarParametros("", "", "PRM")

                    If Not (dt Is Nothing) Then
                        'resb.Append("[")
                        'resb.Append("<option value='" & "0" & "' >")
                        'resb.Append("" & "VACÍO" & "</option>")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("<option value='" & MiDataRow("CODIGO").ToString.Substring(3, 1) & "' >")
                            resb.Append("" & MiDataRow("DESCRIPCION").ToString & "</option>")
                        Next
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If



            End Select

        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
        context.Response.Write(res)

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


    Public Function Devuelve_Nombre_Mes(omes As String) As String

        Dim cMes As String = ""

        If omes = "1" Then
            cMes = "ENERO"
        ElseIf omes = "2" Then
            cMes = "FEBRERO"
        ElseIf omes = "3" Then
            cMes = "MARZO"
        ElseIf omes = "4" Then
            cMes = "ABRIL"
        ElseIf omes = "5" Then
            cMes = "MAYO"
        ElseIf omes = "6" Then
            cMes = "JUNIO"
        ElseIf omes = "7" Then
            cMes = "JULIO"
        ElseIf omes = "8" Then
            cMes = "AGOSTO"
        ElseIf omes = "9" Then
            cMes = "SEPTIEMBRE"
        ElseIf omes = "10" Then
            cMes = "OCTUBRE"
        ElseIf omes = "11" Then
            cMes = "NOVIEMBRE"
        ElseIf omes = "12" Then
            cMes = "DICIEMBRE"
        End If

        Return cMes
    End Function



End Class