<%@ WebHandler Language="VB" Class="NCCOWH" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCCOWH : Implements IHttpHandler


    Dim OPCION As String

    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NC.NCWhatsapp("Bn")
    Dim res As String
    Dim codrec As String
    Dim p_CODIGO, p_CTLG_CODE, p_BUSINESS_ID, p_TELEFONO, p_PHONE_NUMBER_ID, p_TOKEN, p_WABA_ID, p_VERSION, p_ESTADO_IND, p_USUA_ID As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        p_CODIGO = context.Request("p_CODIGO")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_BUSINESS_ID = context.Request("p_BUSINESS_ID")
        p_TELEFONO = context.Request("p_TELEFONO")
        p_PHONE_NUMBER_ID = context.Request("p_PHONE_NUMBER_ID")
        p_TOKEN = context.Request("p_TOKEN")
        p_WABA_ID = context.Request("p_WABA_ID")
        p_VERSION = context.Request("p_VERSION")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_USUA_ID = context.Request("p_USUA_ID")

        If codrec <> String.Empty Then
            flag = "C"
        End If


        Select Case flag.ToString

            Case "1"

                res = crearWhatsapp(p_CTLG_CODE, p_BUSINESS_ID, p_TELEFONO, p_PHONE_NUMBER_ID, p_TOKEN, p_WABA_ID, p_VERSION,
                                    p_ESTADO_IND, p_USUA_ID, p_CODIGO)

            Case "2"

                res = ActualizarWhatsapp(p_CODIGO, p_CTLG_CODE, p_BUSINESS_ID, p_TELEFONO, p_PHONE_NUMBER_ID, p_TOKEN, p_WABA_ID, p_VERSION,
                                         p_ESTADO_IND, p_USUA_ID)

            Case "3"

                res = CambiarEstadoWhatsapp(p_CODIGO)

            Case Else

                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarCuentasWhatsapp(codrec, String.Empty, String.Empty)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("Codigo") & """,")
                resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("Codigo_Empresa") & """,")
                resb.Append("""ID_EMPRESA"" :" & """" & dt.Rows(0)("Id_Negocio") & """,")
                resb.Append("""NRO_TELEFONO"" :" & """" & dt.Rows(0)("Telefono") & """,")
                resb.Append("""ID_TELEFONO"" :" & """" & dt.Rows(0)("Id_Telefono") & """,")
                resb.Append("""TOKEN"" :" & """" & dt.Rows(0)("Token") & """,")
                resb.Append("""WABA_ID"" :" & """" & dt.Rows(0)("Id_Cuenta_whatsapp") & """,")
                resb.Append("""VERSION"" :" & """" & dt.Rows(0)("Version_Whatsapp") & """,")
                resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("Estado") & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

        End Select

        context.Response.Write(res)

    End Sub

    Public Function crearWhatsapp(ByVal p_ctlg As String, ByVal p_id_negocio As String, ByVal p_tele As String,
                                  ByVal p_id_tele As String, ByVal p_token As String, ByVal p_waba_id As String, ByVal p_version As String,
                                  ByVal p_estado As String, ByVal p_usua As String, ByVal p_codi As String) As String
        Dim datos As String

        datos = p.CrearCuentaWhatsapp(p_ctlg, p_id_negocio, p_tele, p_id_tele, p_token, p_waba_id, p_version, p_estado, p_usua, p_codi)

        Return datos

    End Function

    Public Function CambiarEstadoWhatsapp(ByVal p_codigo As String) As String

        Dim datos As String

        datos = p.CambiarEstadoCuentaWhatsapp(p_codigo)

        Return datos

    End Function

    Public Function ActualizarWhatsapp(ByVal p_codi As String, ByVal p_ctlg As String, ByVal p_id_negocio As String, ByVal p_tele As String,
                                       ByVal p_id_tele As String, ByVal p_token As String, ByVal p_waba_id As String, ByVal p_version As String,
                                       ByVal p_estado As String, ByVal p_usua As String) As String
        Dim datos As String

        datos = p.ActualizarCuentaWhatsapp(p_codi, p_ctlg, p_id_negocio, p_tele, p_id_tele, p_token, p_waba_id, p_version, p_estado, p_usua)

        Return datos

    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class