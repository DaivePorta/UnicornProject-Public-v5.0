<%@ WebHandler Language="VB" Class="CTMNIPL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMNIPL : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String
    Dim sCodEmpresa As String
    Dim sCodPlanContable As String
    Dim sCodTipoPlanContable As String
    Dim sNombrePlanContable As String
    Dim iNroNiveles As Integer
    Dim sDigitosNiveles As String
    Dim sReplicaCreacion As String
    Dim sReplicaCreaDigitos As String
    Dim sReplicaEdicion As String
    Dim sReplicaEditaDigitos As String
    Dim sEstado As String
    Dim sPredeterminado As String
    Dim sCodUsuario As String
    Dim sEmpresa As String

    Dim sResponse As String
    Dim oDT As New DataTable

    Dim oNCEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim oCTPlanContable As New Nomade.CT.CTPlanContable("Bn")
    Dim oCTPlanContableTipo As New Nomade.CT.CTPlanContableTipo("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        sOpcion = context.Request("sOpcion")

        sCodEmpresa = Utilities.mGetEmpresa(context)

        sEmpresa = context.Request("sEmpresa")
        sEmpresa = IIf(sEmpresa Is Nothing, "", sEmpresa)

        sCodPlanContable = context.Request("sCodPlanContable")
        sCodPlanContable = IIf(sCodPlanContable Is Nothing, "", sCodPlanContable)

        sCodTipoPlanContable = context.Request("sCodTipoPlanContable")
        sCodTipoPlanContable = IIf(sCodTipoPlanContable Is Nothing, "", sCodTipoPlanContable)

        sNombrePlanContable = context.Request("sNombrePlanContable")
        sNombrePlanContable = IIf(sNombrePlanContable Is Nothing, "", sNombrePlanContable)

        Dim sNroNiveles As String = context.Request("iNroNiveles")
        sNroNiveles = IIf(sNroNiveles Is Nothing, "0", sNroNiveles)
        iNroNiveles = IIf(Utilities.mEsNumero(sNroNiveles), sNroNiveles, 0)

        sDigitosNiveles = context.Request("sDigitosNiveles")
        sDigitosNiveles = IIf(sDigitosNiveles Is Nothing, "", sDigitosNiveles)

        sReplicaCreacion = context.Request("sReplicaCreacion")
        sReplicaCreacion = IIf(sReplicaCreacion Is Nothing, "", sReplicaCreacion)

        sReplicaCreaDigitos = context.Request("sReplicaCreaDigitos")
        sReplicaCreaDigitos = IIf(sReplicaCreaDigitos Is Nothing, "", sReplicaCreaDigitos)

        sReplicaEdicion = context.Request("sReplicaEdicion")
        sReplicaEdicion = IIf(sReplicaEdicion Is Nothing, "", sReplicaEdicion)

        sReplicaEditaDigitos = context.Request("sReplicaEditaDigitos")
        sReplicaEditaDigitos = IIf(sReplicaEditaDigitos Is Nothing, "", sReplicaEditaDigitos)

        sEstado = context.Request("sEstado")
        sEstado = IIf(sEstado Is Nothing, "", sEstado)

        sPredeterminado = context.Request("sPredeterminado")
        sPredeterminado = IIf(sPredeterminado Is Nothing, "", sPredeterminado)

        sCodUsuario = HttpContext.Current.User.Identity.Name



        Try
            Select Case sOpcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oCTPlanContableTipo.fnListaTipoPlanContable(sCodTipoPlanContable, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oCTPlanContable.fnListarPlanContable(sEmpresa, sCodPlanContable, sCodTipoPlanContable, sEstado)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "N"
                    sResponse = oCTPlanContable.fnCrearPlanContable(sEmpresa, sCodTipoPlanContable, sNombrePlanContable, iNroNiveles,
                                                                    sDigitosNiveles, sReplicaCreacion, sReplicaCreaDigitos, sReplicaEdicion,
                                                                    sReplicaEditaDigitos, sEstado, sPredeterminado, sCodUsuario)
                Case "M"
                    oCTPlanContable.fnActualizarPlanContable(sCodPlanContable, sEmpresa, sCodTipoPlanContable, sNombrePlanContable, iNroNiveles,
                                                             sDigitosNiveles, sReplicaCreacion, sReplicaCreaDigitos, sReplicaEdicion, sReplicaEditaDigitos,
                                                             sEstado, sPredeterminado, sCodUsuario)
                    sResponse = "OK"
                Case "3"
                    sResponse = fnGenerarHtmlDigitosNivel(iNroNiveles)
                Case "4"
                    sResponse = fnListaHtmlDigitosNivel(sDigitosNiveles)
                Case Else
            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            context.Response.Write("[Error]: " & ex.ToString)
        End Try
    End Sub

    Public Function fnGenerarHtmlDigitosNivel(ByVal iNroNiveles As Integer) As String
        Dim sHtml As String = ""
        Dim sHtmlCab As String = ""
        Dim htmlf As String = ""
        If iNroNiveles > 0 Then
            sHtml = "<div class='portlet box grey'>"
            sHtml += "<div class='portlet-title'> <h4> <i class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>"
            sHtml += "<div class='portlet-body' style='overflow-x: scroll;'>"
            sHtml += "<Table id='tbDigNiv' class='table '> <thead> "
            htmlf += "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>"
            sHtmlCab += "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>"
            For i As Integer = 1 To iNroNiveles
                htmlf += "<td class='span2' style='text-align:center;'> Nivel " + IIf(i < 10, "0" + i.ToString, i.ToString) + "</td>"
                sHtmlCab += "<td class='span2'>"
                sHtmlCab += "<div class='control-group'>"
                sHtmlCab += "<div class='controls'>"
                sHtmlCab += "<input id=txtNivel" + i.ToString() + " class='m-wrap span12 digiton' style='text-align:center;' type='text' value='0' onkeypress='return ValidaNumeros(event, this)' />"
                sHtmlCab += "</div>"
                sHtmlCab += "</div>"
                sHtmlCab += "</td>"
            Next
            htmlf += "</tr>"
            sHtmlCab += "</tr>"
            sHtml = sHtml + htmlf + sHtmlCab
            sHtml = sHtml + "</tbody> </table> </div> </div>"
        End If
        Return sHtml
    End Function

    Public Function fnListaHtmlDigitosNivel(ByVal sDigitos As String) As String

        Dim digitosnvl As Array = Nothing
        Dim html As String = ""
        Dim htmlc As String = ""
        Dim htmlf As String = ""

        If (sDigitos <> "") Then
            digitosnvl = sDigitos.Split(",")
        End If

        If (Not (digitosnvl Is Nothing)) Then

            html = "<div class='portlet box yellow '>"
            html = html + "<div class='portlet-title'> <h4> <i class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>"
            html = html + "<div class='portlet-body' style='overflow-x: scroll;'>"
            html = html + "<Table id='tbDigNiv' class='table '> <thead> "
            htmlf = htmlf + "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>"
            htmlc = htmlc + "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>"
            For i As Integer = 0 To digitosnvl.Length - 1
                htmlf = htmlf + "<td class='span2' style='text-align:center;'> Nivel " + IIf((i + 1) < 10, "0" + (i + 1).ToString, (i + 1).ToString) + "</td>"
                htmlc = htmlc + "<td class='span2'><input class='m-wrap span12 digiton' style='text-align:center;' type='text' value='" + digitosnvl(i) + "' onkeypress='return ValidaNumeros(event, this)' /></td>"
            Next
            htmlf = htmlf + "</tr>"
            htmlc = htmlc + "</tr>"
            html = html + htmlf + htmlc
            html = html + "</tbody> </table> </div> </div>"

        Else
            html = "No hay digitos registrados para los niveles....!"
        End If

        Return html

    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class