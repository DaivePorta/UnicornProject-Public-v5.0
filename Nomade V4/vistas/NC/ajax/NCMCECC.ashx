<%@ WebHandler Language="VB" Class="NCMCECC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCECC : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    Dim sOpcion As String
    Dim sCodEmpresa, CTLG_CODE, CCOSTOS_CODE, NIVEL As String

    Dim sCodCentroCostosCab As String
    Dim sCodCentroCostosDet As String
    Dim sDescripcion As String
    Dim sAbreviatura As String
    Dim sCodDependencia As String
    Dim iNivel As Integer
    Dim sEstado As String
    Dim sCodUsuario As String

    Dim oNCCentroCostos As New Nomade.NC.NCCentroCostos("Bn")

    Dim oDT As DataTable

    Dim sResponse As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Dim aux As String = context.Request("sEmpresa")
        sCodEmpresa = IIf(aux Is Nothing Or aux = "", Utilities.mGetEmpresa(context), aux)


        sOpcion = context.Request("sOpcion")

        CTLG_CODE = context.Request("CTLG_CODE")
        CCOSTOS_CODE = context.Request("CCOSTOS_CODE")
        NIVEL = context.Request("NIVEL")

        sCodCentroCostosCab = context.Request("sCodCentroCostosCab")
        sCodCentroCostosCab = IIf(sCodCentroCostosCab Is Nothing, "", sCodCentroCostosCab)

        sCodCentroCostosDet = context.Request("sCodCentroCostosDet")
        sCodCentroCostosDet = IIf(sCodCentroCostosDet Is Nothing, "", sCodCentroCostosDet)

        sDescripcion = context.Request("sDescripcion")
        sDescripcion = IIf(sDescripcion Is Nothing, "", sDescripcion)

        sAbreviatura = context.Request("sAbreviatura")
        sAbreviatura = IIf(sAbreviatura Is Nothing, "", sAbreviatura)

        sCodDependencia = context.Request("sCodDependencia")
        sCodDependencia = IIf(sCodDependencia Is Nothing, "", sCodDependencia)

        Dim sNivel As String = context.Request("iNivel")
        sNivel = IIf(sNivel Is Nothing, "", sNivel).ToString.Trim
        iNivel = IIf(Utilities.mEsNumero(sNivel), sNivel, 0)

        sEstado = context.Request("sEstado")
        sEstado = IIf(sEstado Is Nothing, "", sEstado)

        sCodUsuario = HttpContext.Current.User.Identity.Name
        Try

            Select Case sOpcion
                Case "LACC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.fnListarCentroCostosArbol(CTLG_CODE, sCodCentroCostosCab, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LNCC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.fnListarNivelesCostosArbol(sCodCentroCostosCab)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.fnListarCentroCostosCabecera(CTLG_CODE, sCodCentroCostosCab, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "8"
                    context.Response.ContentType = "text/plain"
                    oDT = oNCCentroCostos.fnListaCentroCostosDet(CTLG_CODE, sCodCentroCostosCab, sCodCentroCostosDet, sEstado)

                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "ND"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = oNCCentroCostos.fnCrearCentroCostosDetalle(CTLG_CODE, sCodCentroCostosCab, sDescripcion, sCodDependencia, iNivel, sEstado, sCodUsuario, sAbreviatura)
                    'resArray = GrabarCentroCostosDetalle(sEmpresa, CECC_CODE, DESC, DEPEND_CODE, NIVEL, ESTADO_IND, USUARIO)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    sResponse = resb.ToString()
                Case "MD"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    resArray = oNCCentroCostos.fnActualizarCentroCostosDetalle(sCodCentroCostosCab, sCodCentroCostosDet, sDescripcion, sCodDependencia, iNivel, sEstado, sCodUsuario, sAbreviatura)
                    'resArray = ActualizarCentroCostosDetalle(CODE, CECC_CODE, DESC, DEPEND_CODE, NIVEL, ESTADO_IND, USUARIO)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    sResponse = resb.ToString()
                Case "GETCODCAB"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.fnGetCentroCostoActivo(sCodEmpresa)
                    sResponse = Utilities.DataTableToJSON(oDT)

                Case "NIVELES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.listarNivelesCentroCostos(CTLG_CODE)
                    sResponse = Utilities.DataTableToJSON(oDT)

                Case "CCXNIVELES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oNCCentroCostos.listarCCostosxEmpresaNiveles(CTLG_CODE, NIVEL, CCOSTOS_CODE)
                    sResponse = Utilities.DataTableToJSON(oDT)
                Case Else

            End Select

            context.Response.Write(sResponse)

        Catch ex As Exception
            context.Response.Write("[Error]: " & ex.ToString)
        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class