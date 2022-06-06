<%@ WebHandler Language="VB" Class="CTMCUCO" %>

Imports System
Imports System.Web
Imports System.Data


Public Class CTMCUCO : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    Dim sOpcion As String

    Dim sCodPlanContable As String
    Dim sCuenta As String
    Dim sDescripcion As String
    Dim sCodClaseCuenta As String
    Dim sCuentaPadre As String
    Dim sCodEstereotipo As String
    Dim sFechaIni As String
    Dim sFechaFin As String
    Dim sEstado As String
    Dim sCentroCosto As String
    Dim sDestino As String
    Dim sClasificacionCuenta As String
    Dim sTipoCambio As String
    Dim sCodTipoCambio As String
    Dim sCodFlujoEfectivo As String
    Dim sCodUsuario As String
    Dim sDetalleDestino As String


    Dim oDT As DataTable

    Dim oCTCuentaContable As New Nomade.CT.CTCuentaContable("Bn")

    Dim sResponse As String

    Dim sCodEmpresa As String

    Dim sJSON_CuentaDestino As String
    Dim sJSON_DetCentrosCosto As String
    Dim sCuentaDestino As String
    Dim sCodCentroCostoCab As String
    Dim sCodCentroCostoDet As String
    Dim sDigitos As String
    Dim emp As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")

            sCodPlanContable = context.Request("sCodPlanContable")
            sCodPlanContable = IIf(sCodPlanContable Is Nothing, "", sCodPlanContable)

            sCuenta = context.Request("sCuenta")
            sCuenta = IIf(sCuenta Is Nothing, "", sCuenta)

            sDescripcion = context.Request("sDescripcion")
            sDescripcion = IIf(sDescripcion Is Nothing, "", sDescripcion)

            sCodClaseCuenta = context.Request("sCodClaseCuenta")
            sCodClaseCuenta = IIf(sCodClaseCuenta Is Nothing, "", sCodClaseCuenta)

            sCuentaPadre = context.Request("sCuentaPadre")
            sCuentaPadre = IIf(sCuentaPadre Is Nothing, "", sCuentaPadre)

            sCodEstereotipo = context.Request("sCodEstereotipo")
            sCodEstereotipo = IIf(sCodEstereotipo Is Nothing, "", sCodEstereotipo)

            sFechaIni = context.Request("sFechaIni")
            sFechaIni = IIf(sFechaIni Is Nothing, "", sFechaIni)

            sFechaFin = context.Request("sFechaFin")
            sFechaFin = IIf(sFechaFin Is Nothing, "", sFechaFin)

            sEstado = context.Request("sEstado")
            sEstado = IIf(sEstado Is Nothing, "", sEstado)

            sCentroCosto = context.Request("sCentroCosto")
            sCentroCosto = IIf(sCentroCosto Is Nothing, "", sCentroCosto)

            sDestino = context.Request("sDestino")
            sDestino = IIf(sDestino Is Nothing, "", sDestino)

            sClasificacionCuenta = context.Request("sClasificacionCuenta")
            sClasificacionCuenta = IIf(sDestino Is Nothing, "", sClasificacionCuenta)

            sTipoCambio = context.Request("sTipoCambio")
            sTipoCambio = IIf(sTipoCambio Is Nothing, "", sTipoCambio)

            sCodTipoCambio = context.Request("sCodTipoCambio")
            sCodTipoCambio = IIf(sCodTipoCambio Is Nothing, "", sCodTipoCambio)

            sCodFlujoEfectivo = context.Request("sCodFlujoEfectivo")
            sCodFlujoEfectivo = IIf(sCodFlujoEfectivo Is Nothing, "", sCodFlujoEfectivo)

            sJSON_CuentaDestino = context.Request("sDetCuentaDestino")
            sJSON_CuentaDestino = IIf(sJSON_CuentaDestino Is Nothing, "", sJSON_CuentaDestino)

            sJSON_DetCentrosCosto = context.Request("sJSON_DetCentrosCosto")
            sJSON_DetCentrosCosto = IIf(sJSON_DetCentrosCosto Is Nothing, "", sJSON_DetCentrosCosto)

            sCuentaDestino = context.Request("sCuentaDestino")
            sCuentaDestino = IIf(sCuentaDestino Is Nothing, "", sCuentaDestino)

            sCodCentroCostoCab = context.Request("sCodCentroCostoCab")
            sCodCentroCostoCab = IIf(sCodCentroCostoCab Is Nothing, "", sCodCentroCostoCab)

            sCodCentroCostoDet = context.Request("sCodCentroCostoDet")
            sCodCentroCostoDet = IIf(sCodCentroCostoDet Is Nothing, "", sCodCentroCostoDet)

            sDigitos = context.Request("sDigitos")
            sDigitos = IIf(sDigitos Is Nothing, "", sDigitos)

            sCodEmpresa = Utilities.mGetEmpresa(context)
            sCodUsuario = HttpContext.Current.User.Identity.Name

            sDetalleDestino = vChar(context.Request("sDetalleDestino"))
            sDetalleDestino = IIf(sDigitos Is Nothing, "", sDetalleDestino)

            emp = context.Request("emp")
            emp = IIf(emp Is Nothing, "", emp)


            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "1"
                    Dim oDT_ValidaCuenta As New DataTable
                    'Validación de la Cuenta Padre
                    oDT_ValidaCuenta = oCTCuentaContable.fnListarValidacionCuentaContable(sCodEmpresa, sCodPlanContable, sCuentaPadre)
                    Dim bExiste As Boolean = oDT_ValidaCuenta.Rows(0)("Existe")
                    Dim bUltimoNivel As Boolean = oDT_ValidaCuenta.Rows(0)("UltimoNivel")
                    Dim bMovContable As Boolean = oDT_ValidaCuenta.Rows(0)("MovContable")
                    Dim bTieneDestino As Boolean = oDT_ValidaCuenta.Rows(0)("TieneDestino")
                    Dim cEstado As String = oDT_ValidaCuenta.Rows(0)("Estado")
                    Dim iNroNivelesPlanContab As Integer = oDT_ValidaCuenta.Rows(0)("NroNivelesPlanContab")
                    Dim iNivel As Integer = oDT_ValidaCuenta.Rows(0)("Nivel")
                    If Not bExiste Then
                        sResponse = "[Advertencia]: ¡Imposible Continuar! La Cuenta Padre de la Cuenta a registrar No Existe en la Base de Datos."
                    ElseIf bTieneDestino Then
                        sResponse = "[Advertencia]: ¡Imposible Continuar! La Cuenta Padre de la Cuenta a registrar tiene Cuentas Destino."
                    ElseIf cEstado <> "A" Then
                        sResponse = "[Advertencia]: ¡Imposible Continuar! La Cuenta Padre de la Cuenta a registrar esta Inactiva."
                    ElseIf bMovContable Then
                        sResponse = "[Advertencia]: ¡Imposible Continuar! La Cuenta Padre de la Cuenta a registrar tiene Movimientos Contables registrados en la Base de Datos."
                    ElseIf iNivel = iNroNivelesPlanContab Then
                        sResponse = "[Advertencia]: ¡Imposible Continuar! El Nivel de la Cuenta a registrar supera el Nivel permitido según la Configuración del Plan Contable."
                    Else
                        oDT_ValidaCuenta = New DataTable
                        'Validación de la Cuenta Hijo
                        oDT_ValidaCuenta = oCTCuentaContable.fnListarValidacionCuentaContable(sCodEmpresa, sCodPlanContable, sCuenta)
                        bExiste = oDT_ValidaCuenta.Rows(0)("Existe")
                        bUltimoNivel = oDT_ValidaCuenta.Rows(0)("UltimoNivel")
                        bMovContable = oDT_ValidaCuenta.Rows(0)("MovContable")
                        bTieneDestino = oDT_ValidaCuenta.Rows(0)("TieneDestino")
                        cEstado = oDT_ValidaCuenta.Rows(0)("Estado")
                        iNroNivelesPlanContab = oDT_ValidaCuenta.Rows(0)("NroNivelesPlanContab")
                        iNivel = oDT_ValidaCuenta.Rows(0)("Nivel")
                        If bExiste Then
                            sResponse = "[Advertencia]: ¡Imposible Continuar! La Cuenta a registrar ya Existe en la Base de Datos."
                        ElseIf iNroNivelesPlanContab = -1 Then
                            sResponse = "[Advertencia]: ¡Imposible Continuar! La Configuración de Niveles del Plan Contable es incorrecta."
                        ElseIf iNivel = -1 Then
                            sResponse = "[Advertencia]: ¡Imposible Continuar! La cantidad de caracteres de la Cuenta a Registrar es incorrecta."
                        Else
                            oCTCuentaContable.fnAgregarCuentaContable(sCodEmpresa, sCodPlanContable, sCuenta, sDescripcion, sCodClaseCuenta, sCuentaPadre,
                                                                      Utilities.fechaLocal(sFechaIni), Utilities.fechaLocal(sFechaFin), sEstado, sCentroCosto, sDestino,
                                                                      sTipoCambio, sCodTipoCambio, sCodFlujoEfectivo, sCodUsuario, sClasificacionCuenta)
                            sResponse = "OK"
                        End If
                    End If
                Case "2"

                    Dim rpt As String = oCTCuentaContable.fnEditarCuentaContable(sCodEmpresa, sCodPlanContable, sCuenta, sDescripcion, sEstado, sCentroCosto,
                                                             sDestino, sTipoCambio, sCodTipoCambio, sCodFlujoEfectivo, sCodUsuario, sClasificacionCuenta, sDetalleDestino, sCodEmpresa)
                    sResponse = rpt
                Case "3"
                    oDT = oCTCuentaContable.fnListaCuentasContables(sCodEmpresa, sCuenta, sCodClaseCuenta, sCodPlanContable, sEstado, sCodUsuario)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "4"
                    Dim sEstado As String
                    sEstado = oCTCuentaContable.fnCambiarEstadoCuentaContable(sCuenta, sCodPlanContable, sCodUsuario)
                    sResponse = sEstado
                Case "4.5"
                    Dim sUso As String
                    sUso = oCTCuentaContable.fnCambiarUsoEnBalance(sCuenta, sCodPlanContable, sCodUsuario)
                    sResponse = sUso
                Case "5"
                    oDT = oCTCuentaContable.fnListaCtasContabArbol("", sCodPlanContable, sEstado, sDigitos)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "6"
                    oDT = oCTCuentaContable.fnListaCuentasHoja(sCodEmpresa, sCodPlanContable, sCuenta, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "7"
                    oDT = oCTCuentaContable.fnListaCtasHojaFiltro(sCodEmpresa, sCodPlanContable, sCuenta, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "8"
                    oDT = oCTCuentaContable.fnListaCuentasDestino(sCodEmpresa, sCodPlanContable, sCuenta, sCuentaDestino, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "9"
                    oDT = oCTCuentaContable.fnListarCentrosCostoxCuentaContable(sCodEmpresa, sCodPlanContable, sCuenta, sCodCentroCostoCab, sCodCentroCostoDet, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "10"
                    oDT = oCTCuentaContable.fnListaCuentasContablesDestino(sCodEmpresa, sCuenta, sCodPlanContable, "A")
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If

            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            context.Response.Write("[Error]: " & ex.ToString)
        End Try
    End Sub

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, " ")
        Else
            res = campo
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class