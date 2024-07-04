<%@ WebHandler Language="VB" Class="BBLCONF" %>

Imports System
Imports System.Web
Imports System.Data

Public Class BBLCONF : Implements IHttpHandler
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        Dim Opcion, Emp, Usuario As String
        Dim Comision As New Nomade.BB.BBComisionSistemaPension("Bn")
        Dim Periodo As New Nomade.NF.NFPeriodo("Bn")

        Opcion = context.Request("Opcion")
        Emp = context.Request("Emp")
        Usuario = context.Request("usuario")
        Dim cFecha As String = context.Request("fe")

        Try
            Select opcion
                Case "0"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Periodo.Listar_Periodo("", "", "N")
                    'dt = Comision.ListarCombo()
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            'resb.Append("""NOMBRE"" :" & """" & MiDataRow("ANO").ToString & "-" & MiDataRow("NUMERO_MES").ToString & """")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("MES").ToString & " " & MiDataRow("ANO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "O"




                    Dim dia = Now()
                    Dim Fecha = Devuelve_Nombre_Mes(dia.Month().ToString) + " " + dia.Year().ToString

                    res = Fecha


                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Comision.ListarConfiguracion("", Emp, cFecha.ToUpper())
                    Dim cSino As String = ""
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTCONFI_CODE").ToString & """,")
                            resb.Append("""COLUMNA"" :" & """" & MiDataRow("FTCONFI_COLUMNA").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                            resb.Append("""PADRE"" :" & """" & MiDataRow("FTCONFI_PADRE").ToString & """,")
                            If MiDataRow("FTCONFI_bAFP").ToString.Equals("1") Then
                                cSino = "SÍ"
                            Else
                                cSino = "NO"
                            End If
                            resb.Append("""AFP"" :" & """" & cSino & """,")

                            If MiDataRow("FTCONFI_bONP").ToString.Equals("1") Then
                                cSino = "SÍ"
                            Else
                                cSino = "NO"
                            End If
                            resb.Append("""ONP"" :" & """" & cSino & """,")

                            If MiDataRow("FTCONFI_bOTROS").ToString.Equals("1") Then
                                cSino = "SÍ"
                            Else
                                cSino = "NO"
                            End If
                            resb.Append("""OTROS"" :" & """" & cSino & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If


                Case "R" 'Asignar configuración siguiente
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = Comision.crearConfiguracionRepetida(cFecha.ToUpper(), Emp, Usuario)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
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