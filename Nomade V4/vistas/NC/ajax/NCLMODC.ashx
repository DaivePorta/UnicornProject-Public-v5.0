<%@ WebHandler Language="VB" Class="NCLMODC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCLMODC : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim P_NOMBRE, P_DESCRIPCION, P_USUARIO, P_ESTADO, P_CODE, P_CTLG, P_VALOR As String

    Dim modu As New Nomade.NC.NCModuloContable("Bn")



    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        P_NOMBRE = context.Request("P_NOMBRE")
        P_DESCRIPCION = context.Request("P_DESCRIPCION")
        P_USUARIO = context.Request("P_USUARIO")
        P_ESTADO = context.Request("P_ESTADO")
        P_CODE = context.Request("P_CODIGO")
        P_CTLG = context.Request("P_CTLG")
        P_VALOR = context.Request("P_VALOR")

        OPCION = context.Request("OPCION")
        Try
            Select Case OPCION
                Case "1" 'Lista tipo de Documento
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = modu.ListarModulos(P_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "2" 'Crear Modulo Contable
                    res = modu.CrearModuloContable(P_NOMBRE, P_DESCRIPCION, P_USUARIO)

                Case "3" 'Modificar Modulo Contable
                    res = modu.ActualizarModuloContable(P_CODE, P_NOMBRE, P_DESCRIPCION, P_USUARIO, P_ESTADO)

                Case "4" 'Crear detalle Modulo Contable
                    res = modu.CrearDetalleModuloContable(P_CODE, P_CTLG, P_VALOR)

                Case "5" 'Lista DETALLE MODULOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = modu.ListarDetalleModulos(P_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "6" 'Eliminar detalle Modulo Contable
                    res = modu.EliminarDetalleModuloContable(P_CODE, P_CTLG)

                Case "7" 'Cambiar estado Modulo Contable
                    res = modu.CambiarEstadoModuloContable(P_CODE, P_ESTADO)


            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class