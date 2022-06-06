<%@ WebHandler Language="VB" Class="NMMCLBI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMCLBI : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable
    Dim p As New Nomade.NM.NMClasificacionBienes("Bn")
    Dim res As String
    Dim p_CODE, p_DESCRIPCION, p_DESC_CORTA, p_ORDEN, p_ESTADO_IND, USUA_ID, unba, tipo_uni, estado, p_DESCRIPCION_CORTA, P_CODE_SUNAT, P_ESTADO, P_USUARIO As String
    Dim estado2 As String
    Dim resb As New StringBuilder
    Dim unvo As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        OPCION = context.Request("OPCION")
        USUA_ID = context.Request("USUA_ID")
        '-----------
        p_CODE = context.Request("p_CODE")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")

        P_CODE_SUNAT = context.Request("P_CODE_SUNAT")

        p_DESCRIPCION_CORTA = context.Request("p_DESCRIPCION_CORTA")

        P_ESTADO = context.Request("P_ESTADO")

        P_USUARIO = context.Request("P_USUARIO")



        p_DESC_CORTA = context.Request("p_DESC_CORTA")
        p_ORDEN = context.Request("p_ORDEN") ' CODIGO SUNAT
        p_ESTADO_IND = context.Request("p_ESTADO_IND")



        Try

            Select Case OPCION.ToString
                Case "1"
                    res = p.CrearClasificacionBienes(p_DESCRIPCION, p_DESCRIPCION_CORTA, P_CODE_SUNAT, P_ESTADO, P_USUARIO) 'CrearUnidadMedida(codigo_sunat, desc, desc_corta, activo, user, unba, unvo, tipo_uni)

                Case "2"
                    res = p.ActualizarClasificacionBienes(p_CODE, p_DESCRIPCION, p_DESCRIPCION_CORTA, P_CODE_SUNAT, P_ESTADO, 5)  'ActualizarUnidadMedida(codigo, codigo_sunat, desc, desc_corta, activo, user, unba, unvo, tipo_uni)

                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarClasificacionBienes(p_CODE, p_DESCRIPCION, p_DESC_CORTA, p_ESTADO_IND) 'ListarUnidadMedida(codigo, String.Empty, IIf(tipo_uni = Nothing, String.Empty, tipo_uni))
                    'resb.Append("[")
                    'resb.Append("{")
                    'resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    'resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    'resb.Append("""DESC_CORTA"" :" & """" & dt.Rows(0)("DESC_CORTA") & """,")
                    'resb.Append("""ORDEN"" :" & """" & dt.Rows(0)("ORDEN") & """,")
                    'resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    'resb.Append("}")
                    'resb.Append("]")
                    'res = resb.ToString()
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error!!!:" & ex.ToString)
        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class