<%@ WebHandler Language="VB" Class="NALPEDE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALPEDE : Implements IHttpHandler

    Dim OPCION, CTLG_CODE As String

    Dim PROD_CODE, F_DESDE, F_HASTA, COD_ALMC, CHK_CODE As String



    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        OPCION = context.Request("OPCION")

        CTLG_CODE = vChar(context.Request("CTLG_CODE"))
        COD_ALMC = context.Request("COD_ALMC")
        CHK_CODE = context.Request("CHK_CODE")
        F_DESDE = context.Request("F_DESDE")
        F_HASTA = context.Request("F_HASTA")

        Try

            Select Case OPCION
                Case "LP" 'LISTAR POR PRODUCTO ESPECIFICO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")

                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_estado_prod_vendido(CTLG_CODE, COD_ALMC, PROD_CODE, CHK_CODE, Utilities.fechaLocal(F_DESDE), Utilities.fechaLocal(F_HASTA))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LPC" 'LISTAR SIN PRODUCTO ESPEFICO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")


                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_estado_prod_vendido(CTLG_CODE, COD_ALMC, PROD_CODE, CHK_CODE, Utilities.fechaLocal(F_DESDE), Utilities.fechaLocal(F_HASTA))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function


    Public Function vDesc(ByVal valor As String) As String
        Dim res As String
        Try
            If Decimal.Parse(valor) = 0 Then
                res = ""
            Else
                res = valor + "-"
            End If
        Catch ex As Exception
            res = ""
        End Try
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class