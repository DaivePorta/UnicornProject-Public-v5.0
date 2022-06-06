<%@ WebHandler Language="VB" Class="NCMESCC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMESCC : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState

    Dim OPCION As String

    Dim CODE, CTLG_CODE, NOMBRE_PLAN, sCodEmpresa, ESTADO_IND, FECHA_INICIO, FECHA_FIN, USUA_ID, DIGITOSNVL, sDigitos, sNombres As String
    Dim NIVELES, NIVEL1_DIG, NIVEL2_DIG, NIVEL3_DIG, NIVEL4_DIG, NRODIGNIV As Integer

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim oNCCentroCostos As New Nomade.NC.NCCentroCostos("Bn")
    Dim q As New Nomade.NC.NCEmpresa("Bn")
    Dim usua As String
    Dim sEmpresa As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Dim aux As String = context.Request("sEmpresa")
        sEmpresa = IIf(aux Is Nothing, Utilities.mGetEmpresa(context), aux)
        USUA_ID = HttpContext.Current.User.Identity.Name
        OPCION = context.Request("OPCION")

        sCodEmpresa = context.Request("sCodEmpresa")

        CODE = context.Request("CODE")
        CTLG_CODE = context.Request("CTLG_CODE")
        'CTLG_CODE = sEmpresa
        NOMBRE_PLAN = context.Request("NOMBRE_PLAN")
        NIVELES = context.Request("NIVELES")
        'NIVEL1 = context.Request("NIVEL1")
        'NIVEL1_DIG = context.Request("NIVEL1_DIG")
        'NIVEL2 = context.Request("NIVEL2")
        'NIVEL2_DIG = context.Request("NIVEL2_DIG")
        'NIVEL3 = context.Request("NIVEL3")
        'NIVEL3_DIG = context.Request("NIVEL3_DIG")
        'NIVEL4 = context.Request("NIVEL4")
        'NIVEL4_DIG = context.Request("NIVEL4_DIG")
        sDigitos = context.Request("sDigitos")
        sNombres = context.Request("sNombres")
        ESTADO_IND = context.Request("ESTADO_IND")
        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_FIN = context.Request("FECHA_FIN")
        DIGITOSNVL = context.Request("DIGITOSNVL")
        usua = context.Request("usua")

        Try
            Select Case OPCION
                Case "0"
                    context.Response.ContentType = "text/html"
                    dt = oNCCentroCostos.fnListarCentroCostosCabecera(sEmpresa, String.Empty, String.Empty)
                    res = GenerarHtmlCentroCostos(dt)
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.ListarEmpresa(String.Empty, "A", usua)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = oNCCentroCostos.fnListarCentroCostosCabecera(sCodEmpresa, CODE, String.Empty)
                    If Not (dt Is Nothing) Then
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "NC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = GrabarCentroCostosCabecera(CTLG_CODE, NOMBRE_PLAN, Integer.Parse(NIVELES), sDigitos, ESTADO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID, sNombres)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "MC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If FECHA_FIN <> String.Empty Then
                        FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                    End If
                    resArray = ActualizarCentroCostosCabecera(CODE, CTLG_CODE, NOMBRE_PLAN, Integer.Parse(NIVELES), sDigitos, ESTADO_IND, Utilities.fechaLocal(FECHA_INICIO), FECHA_FIN, USUA_ID, sNombres)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""RPTA"" :" & """" & resArray(1).ToString & """")

                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "GDN"
                    context.Response.ContentType = "text/plain"
                    NRODIGNIV = context.Request("NRODIGNIV")
                    Dim niveles As Int16 = Convert.ToInt16(NRODIGNIV)
                    res = GenerarHtmlDigitosNivel(niveles)
                Case "VERACT"
                    context.Response.ContentType = "text/plain"
                    res = oNCCentroCostos.fnVerificarCentroCostos(sEmpresa)
                Case "LDN"
                    context.Response.ContentType = "text/plain"
                    dt = oNCCentroCostos.fnListarCentroCostosCabecera(sEmpresa, CODE, String.Empty)
                    If Not (dt Is Nothing) Then
                        If (dt.Rows.Count = 1) Then
                            'Dim niveles As Int16 = Convert.ToInt16(NRODIGNIV)
                            res = ListaHtmlDigitosNivel(dt.Rows(0)("digitos_nivel").ToString)
                        End If

                    End If
                Case "LESCC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = oNCCentroCostos.Listar_CentroCostos_Cabecera(String.Empty, sEmpresa, String.Empty, String.Empty, String.Empty)
                    If Not dt Is Nothing Then

                        res = Utilities.DataTableToJSON(dt) '' GenerarHtmlCentroCostos(dt)
                    Else
                        res = "[]"
                    End If

                Case Else
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

    Public Function GenerarHtmlCentroCostos(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblCentroCostos"" cellspacing=""0""  class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr>"
            res += "<td align='center'>EMPRESA</td>"
            res += "<td align='center'>CENTRO COSTO</td>"
            res += "<td align='center'>NIVELES</td>"
            res += "<td align='center'>FECHA INICIO</td>"
            res += "<td align='center'>FECHA TÉRMINO</td>"
            res += "<td align='center'>ESTADO</td>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
                res += "<td align='left'>" & dt.Rows(i)("NCTLG_CODE").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("NOMBRE_PLAN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NIVELES").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_INICIO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_FIN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NESTADO_IND").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function

    'Public Function GenerarHtmlCentroCostos(ByVal dt As DataTable) As String
    '    If Not dt Is Nothing Then
    '        res = "<table id=""tblCentroCostos"" cellspacing=""0""  class=""display DTTT_selectable"">"
    '        res += "<thead>"
    '        res += "<tr>"
    '        res += "<td align='center'>EMPRESA</td>"
    '        res += "<td align='center'>CENTRO COSTO</td>"
    '        res += "<td align='center'>NIVELES</td>"
    '        res += "<td align='center'>NIVEL 1</td>"
    '        res += "<td align='center'>NIVEL 2</td>"
    '        res += "<td align='center'>NIVEL 3</td>"
    '        res += "<td align='center'>NIVEL 4</td>"
    '        res += "<td align='center'>FECHA INICIO</td>"
    '        res += "<td align='center'>FECHA TÉRMINO</td>"
    '        res += "<td align='center'>ESTADO</td>"
    '        res += "</tr>"
    '        res += "</thead>"
    '        res += "<tbody>"
    '        For i As Integer = 0 To dt.Rows.Count - 1
    '            res += "<tr id='" & dt.Rows(i)("CODE").ToString() & "'>"
    '            res += "<td align='left'>" & dt.Rows(i)("NCTLG_CODE").ToString() & "</td>"
    '            res += "<td align='left'>" & dt.Rows(i)("NOMBRE_PLAN").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NIVELES").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NIVEL1").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NIVEL2").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NIVEL3").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NIVEL4").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("FECHA_INICIO").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("FECHA_FIN").ToString() & "</td>"
    '            res += "<td align='center'>" & dt.Rows(i)("NESTADO_IND").ToString() & "</td>"
    '            res += "</tr>"
    '        Next
    '        res += "</tbody>"
    '        res += "</table>"
    '    Else
    '        res = "No se encontraron datos!!!"
    '    End If
    '    Return res
    'End Function

    Public Function GrabarCentroCostosCabecera(ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_DIGITOS_NIVEL As String, ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String,
                                                ByVal p_PTVCECC_FECHA_FIN As String, ByVal p_PTVCECC_USUA_ID As String, ByVal p_NOMBRES_NIVEL As String) As Array
        Dim datos(2) As String
        datos = oNCCentroCostos.Crear_CentroCostos_CabeceraCab(p_PTVCECC_CTLG_CODE, p_PTVCECC_NOMBRE_PLAN, p_PTVCECC_NIVELES, p_DIGITOS_NIVEL, p_PTVCECC_ESTADO_IND, p_PTVCECC_FECHA_INICIO, p_PTVCECC_FECHA_FIN, p_PTVCECC_USUA_ID, p_NOMBRES_NIVEL)
        Return datos
    End Function

    Public Function ActualizarCentroCostosCabecera(ByVal p_PTVCECC_CODE As String, ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_DIGITOS_NIVEL As String, ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String, ByVal p_PTVCECC_FECHA_FIN As String, ByVal p_PTVCECC_USUA_ID As String, ByVal p_NOMBRES_NIVEL As String) As Array
        Dim datos(2) As String
        datos = oNCCentroCostos.Actualizar_CentroCostos_Cabecera(p_PTVCECC_CODE, p_PTVCECC_CTLG_CODE, p_PTVCECC_NOMBRE_PLAN, p_PTVCECC_NIVELES, p_DIGITOS_NIVEL, p_PTVCECC_ESTADO_IND, p_PTVCECC_FECHA_INICIO, p_PTVCECC_FECHA_FIN, p_PTVCECC_USUA_ID, p_NOMBRES_NIVEL)
        Return datos
    End Function
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function


    Public Function GenerarHtmlDigitosNivel(ByVal niveles As Int16) As String
        Dim html As String = ""
        Dim htmlc As String = ""
        Dim htmlf As String = ""
        If niveles > 0 Then

            html = "<div Class='portlet box yellow '>"
            html = html + "<div Class='portlet-title'> <h4> <i Class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>"
            html = html + "<div Class='portlet-body' style='overflow-x: scroll;'>"
            html = html + "<Table id='tbDigNiv' Class='table '> <thead> "
            htmlf = htmlf + "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>"
            htmlc = htmlc + "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>"
            For i As Integer = 1 To niveles
                htmlf = htmlf + "<td class='span2' style='text-align:center;'> Nivel " + IIf(i < 10, "0" + i.ToString, i.ToString) + "</td>"
                htmlc = htmlc + "<td class='span2'><input  class='m-wrap span12 digiton' style='text-align:center;' type='text' value='0' onkeypress='return ValidaNumeros(event, this)' /></td>"
            Next
            htmlf = htmlf + "</tr>"
            htmlc = htmlc + "</tr>"
            html = html + htmlf + htmlc
            html = html + "</tbody> </table> </div> </div>"

        End If

        Return html

    End Function

    Public Function ListaHtmlDigitosNivel(ByVal digitos As String) As String

        Dim digitosnvl As Array = Nothing
        Dim html As String = ""
        Dim htmlc As String = ""
        Dim htmlf As String = ""

        If (digitos <> "") Then
            digitosnvl = digitos.Split(",")
        End If

        If (Not (digitosnvl Is Nothing)) Then

            html = "<div Class='portlet box yellow '>"
            html = html + "<div Class='portlet-title'> <h4> <i Class='icon-list-ul'></i>&nbsp Digitos por Nivel </h4> </div>"
            html = html + "<div Class='portlet-body' style='overflow-x: scroll;'>"
            html = html + "<Table id='tbDigNiv' Class='table '> <thead> "
            htmlf = htmlf + "<tr><td class='span2' style='font-weight: 700'>NIVELES</td>"
            htmlc = htmlc + "<tr><td class='span2' style='font-weight: 700;vertical-align: inherit;'>DIGITOS</td>"
            For i As Integer = 0 To digitosnvl.Length - 1
                htmlf = htmlf + "<td class='span2' style='text-align:center;'> Nivel " + IIf((i + 1) < 10, "0" + (i + 1).ToString, (i + 1).ToString) + "</td>"
                htmlc = htmlc + "<td class='span2'><input  class='m-wrap span12 digiton' style='text-align:center;' type='text'  value='" + digitosnvl(i) + "' onkeypress='return ValidaNumeros(event, this)' /></td>"
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

End Class