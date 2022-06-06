<%@ WebHandler Language="VB" Class="Handler" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO




Public Class Handler : Implements IHttpHandler

    Dim P_TIPO, P_ACTIVO As String
    Dim P_PERSONA As Integer

    Dim P_TIPOCONTA As String
    Dim PIDMEMPRESA As String
    Dim P_ESTADOCONTA As String
    Dim OPCION As String

    Dim PIDM As Integer

    Dim APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, ENTIDAD_IND, TINO_CODE, USUA_ID As String

    Dim RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL, WEB, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, _
        FECHA_AGENTE_PERCEP, BUEN_CONTRIB_IND, FECHA_BUEN_CONTRIB, RELACIONADA_IND, RELACIONADA_CODE As String

    Dim SEXO, ESCI_CODE As String

    Dim DOID_CODE, NRO, NRO_RUC, ESTADO_IND As String

    Dim PPRTELE_NUM_SEQ As Integer
    Dim PPRTELE_TIDT_CODE, OPERADOR, NUMERO, P_TIPOGENERAL As String

    Dim PPRCORR_NUM_SEQ As Integer
    Dim PPRCORR_TIDT_CODE, CORREO As String

    Dim PPBIMAG_CODE, TIPO, PPBIMAG_NOMBRE, PPBIMAG_NOMBRE_RUC As String

    Dim PPBIMAG_URL, RUTA_PPBIMAG, PPBIMAG As String

    ' Dim PPBIMAG As HttpPostedFile


    Dim TIPOIMAGEN As String

    Dim TCON_TIPO As String

    Dim INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE As String

    Dim CTLG_CODE As String

    Dim PAGENUM, PAGESIZE, DNICONT As Integer

    Dim dt As DataTable
    Dim sCONDI_SUNAT, sESTADO_SUNAT As String
    'Instanciamos las clases de Persona

    Dim p As New Nomade.NC.NCDocumentoIdentidad("Bn")
    Dim q As New Nomade.NC.NCPersona("Bn")
    Dim e As New Nomade.NC.NCEstadoCivil("Bn")
    Dim u As New Nomade.NC.NCTipoUbicacion("Bn")
    Dim a As New Nomade.NC.NCActividad("Bn")
    Dim r As New Nomade.NC.NCEmpresa("Bn")
    Dim k As New Nomade.NC.NCTipodeContribuyente("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim captcha As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        P_ACTIVO = context.Request("P_ACTIVO")
        P_TIPO = context.Request("P_TIPO")
        P_PERSONA = context.Request("P_PERSONA")

        P_TIPOCONTA = context.Request("P_TIPOCONTA")
        P_ESTADOCONTA = context.Request("P_ESTADOCONTA")
        PIDMEMPRESA = context.Request("PIDMEMPRESA")
        PIDM = context.Request("PIDM")
        OPCION = context.Request("OPCION")

        P_TIPOCONTA = context.Request("P_TIPOCONTA")
        P_ESTADOCONTA = context.Request("P_ESTADOCONTA")
        APELL_PATE = context.Request("APELL_PATE")
        APELL_MATE = context.Request("APELL_MATE")
        NOMBRE = context.Request("NOMBRE")
        FECHA = context.Request("FECHA")
        AGENTE_RETEN_IND = context.Request("AGENTE_RETEN_IND")

        RAZO_COME = context.Request("RAZO_COME")
        ACTIVIDAD = context.Request("ACTIVIDAD")
        CONTACTO = context.Request("CONTACTO")
        REP_LEGAL = context.Request("REP_LEGAL")
        WEB = context.Request("WEB")
        FECHA_AGENTE_RETEN = context.Request("FECHA_AGENTE_RETEN")
        AGENTE_PERCEP_IND = context.Request("AGENTE_PERCEP_IND")
        FECHA_AGENTE_PERCEP = context.Request("FECHA_AGENTE_PERCEP")
        BUEN_CONTRIB_IND = context.Request("BUEN_CONTRIB_IND")
        FECHA_BUEN_CONTRIB = context.Request("FECHA_BUEN_CONTRIB")

        RELACIONADA_IND = context.Request("RELACIONADA_IND")
        RELACIONADA_CODE = context.Request("RELACIONADA_CODE")

        ENTIDAD_IND = context.Request("ENTIDAD_IND")
        TINO_CODE = context.Request("TINO_CODE")
        USUA_ID = context.Request("USUA_ID")

        SEXO = context.Request("SEXO")
        ESCI_CODE = context.Request("ESCI_CODE")

        DOID_CODE = context.Request("DOID_CODE")
        NRO = context.Request("NRO")
        NRO_RUC = context.Request("NRO_RUC")
        ESTADO_IND = context.Request("ESTADO_IND")

        PPRTELE_NUM_SEQ = context.Request("PPRTELE_NUM_SEQ")
        PPRTELE_TIDT_CODE = context.Request("PPRTELE_TIDT_CODE")
        OPERADOR = context.Request("OPERADOR")
        NUMERO = context.Request("NUMERO")

        PPRCORR_NUM_SEQ = context.Request("PPRCORR_NUM_SEQ")
        PPRCORR_TIDT_CODE = context.Request("PPRCORR_TIDT_CODE")
        CORREO = context.Request("CORREO")

        PPBIMAG_CODE = context.Request("PPBIMAG_CODE")
        TIPO = context.Request("TIPO")
        '  PPBIMAG = context.Request.Files("PPBIMAG")
        PPBIMAG = context.Request("PPBIMAG")

        PPBIMAG_URL = context.Request("PPBIMAG_URL")

        TCON_TIPO = context.Request("TCON_TIPO")

        INICIO_ACTIVIDAD = context.Request("INICIO_ACTIVIDAD")
        TIPO_CONTRIBUYENTE = context.Request("TIPO_CONTRIBUYENTE")

        CTLG_CODE = context.Request("CTLG_CODE")

        PAGENUM = context.Request("PAGENUM")
        PAGESIZE = context.Request("PAGESIZE")
        DNICONT = context.Request("DNICONT")
        P_TIPOGENERAL = context.Request("P_TIPOGENERAL")

        sCONDI_SUNAT = context.Request("sCONDI_SUNAT")
        sESTADO_SUNAT = context.Request("sESTADO_SUNAT")

        captcha = context.Request("CAPTCHA")
        Select Case OPCION
            Case "0"
                ' context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarDOCUMENTOS_IDENTIDAD(String.Empty, "A", String.Empty)
                If Not (dt Is Nothing) Then
                    'resb.Append("[")
                    'For Each MiDataRow As DataRow In dt.Rows
                    '    If MiDataRow("CODIGO").ToString <> "0" Then
                    '        resb.Append("{")
                    '        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                    '        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                    '        resb.Append("""DESC_CORTA"" :" & """" & MiDataRow("DESC_CORTA").ToString & """")
                    '        resb.Append("}")
                    '        resb.Append(",")
                    '    End If
                    'Next
                    'resb.Append("{}")
                    'resb = resb.Replace(",{}", String.Empty)
                    'resb.Append("]")
                    res = GenerarSelect(dt, "CODIGO", "DESC_CORTA", "DOID")

                End If

            Case "1"
                res = VerificarPersona(DOID_CODE, NRO, String.Empty)
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = e.listar_EstadoCivil(String.Empty, "A")
                If Not (dt Is Nothing) Then
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
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = u.listar_TipoUbicacion(String.Empty, String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""TIPO"" :" & """" & MiDataRow("TIPO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim strRUC As String
                strRUC = ConfigurationManager.AppSettings("CodigoTipoDocumentoRUC")

                'If DOID_CODE = strRUC Then

                If (NRO.Substring(0, 1) = "2" And NRO.Length = 11) Then
                    If NRO = "2xxxxxxxxxx" Then
                        NRO = String.Empty
                    End If
                    dt = q.listar_Persona_Juridica(PIDM, NRO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZONSOCIAL"" :" & """" & MiDataRow("RAZONSOCIAL").ToString.Replace("""", "\""") & """,")
                            resb.Append("""RAZO_COME"" :" & """" & MiDataRow("RAZO_COME").ToString.Replace("""", "\""") & """,")
                            resb.Append("""ACTIVIDAD"" :" & """" & MiDataRow("ACTIVIDAD").ToString & """,")
                            resb.Append("""CONTACTO"" :" & """" & MiDataRow("CONTACTO").ToString & """,")
                            If MiDataRow("CONTACTO_DATOS") Is DBNull.Value Then
                                resb.Append("""CONTACTO_DATOS"" :" & """"",")
                            Else
                                resb.Append("""CONTACTO_DATOS"" :" & MiDataRow("CONTACTO_DATOS").ToString & ",")
                            End If
                            resb.Append("""REP_LEGAL"" :" & """" & MiDataRow("REP_LEGAL").ToString & """,")
                            If MiDataRow("REPRESENTANTE_DATOS") Is DBNull.Value Then
                                resb.Append("""REPRESENTANTE_DATOS"" :" & """"",")
                            Else
                                resb.Append("""REPRESENTANTE_DATOS"" :" & MiDataRow("REPRESENTANTE_DATOS").ToString & ",")
                            End If
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                            resb.Append("""WEB"" :" & """" & MiDataRow("WEB").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString.Replace("""", "\""") & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""PPBIMAG_CODE"" :" & """" & MiDataRow("PPBIMAG_CODE").ToString & """,")
                            resb.Append("""PPBIMAG_NOMBRE"" :" & """" & MiDataRow("PPBIMAG_NOMBRE").ToString & """,")
                            resb.Append("""PPRTELE_NUM_SEQ"" :" & """" & MiDataRow("PPRTELE_NUM_SEQ").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""PPRCORR_NUM_SEQ"" :" & """" & MiDataRow("PPRCORR_NUM_SEQ").ToString & """,")
                            resb.Append("""CORREO"" :" & """" & MiDataRow("CORREO").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""FECHA_RETEN"" :" & """" & MiDataRow("FECHA_RETEN").ToString & """,")
                            resb.Append("""AGENTE_PERCEP_IND"" :" & """" & MiDataRow("AGENTE_PERCEP_IND").ToString & """,")
                            resb.Append("""FECHA_PERCEP"" :" & """" & MiDataRow("FECHA_PERCEP").ToString & """,")

                            resb.Append("""BUEN_CONTRIB_IND"" :" & """" & MiDataRow("BUEN_CONTRIB_IND").ToString & """,")
                            resb.Append("""FECHA_BUEN_CONTRIB"" :" & """" & MiDataRow("FECHA_BUEN_CONTRIB").ToString & """,")

                            resb.Append("""RELACIONADA_IND"" :" & """" & MiDataRow("RELACIONADA_IND").ToString & """,")
                            resb.Append("""RELACIONADA_CODE"" :" & """" & MiDataRow("RELACIONADA_CODE").ToString & """,")
                            resb.Append("""ENTIDAD_IND"" :" & """" & MiDataRow("ENTIDAD_IND").ToString & """,")
                            resb.Append("""INICIO_ACTIVIDAD"" :" & """" & MiDataRow("INICIO_ACTIVIDAD").ToString & """,")

                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""TCON_CODE"" :" & """" & MiDataRow("TCON_CODE").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                Else
                    If NRO = "xxxxxxxx" Then
                        NRO = String.Empty
                    End If


                    dt = q.listar_Persona_Natural(PIDM, DOID_CODE, NRO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")

                            resb.Append("""BUEN_CONTRIB_IND"" :" & """" & MiDataRow("BUEN_CONTRIB_IND").ToString & """,")

                            resb.Append("""ENTIDAD_IND"" :" & """" & MiDataRow("ENTIDAD_IND").ToString & """,")
                            resb.Append("""TINO_CODE"" :" & """" & MiDataRow("TINO_CODE").ToString & """,")
                            resb.Append("""SEXO"" :" & """" & MiDataRow("SEXO").ToString & """,")
                            resb.Append("""ESCI_CODE"" :" & """" & MiDataRow("ESCI_CODE").ToString & """,")
                            resb.Append("""NESCI_CODE"" :" & """" & MiDataRow("NESCI_CODE").ToString & """,")
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                            resb.Append("""DOID_CODE"" :" & """" & MiDataRow("DOID_CODE").ToString & """,")
                            resb.Append("""NRO_RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""PPRTELE_NUM_SEQ"" :" & """" & MiDataRow("PPRTELE_NUM_SEQ").ToString & """,")
                            resb.Append("""PPRTELE_TIDT_CODE"" :" & """" & MiDataRow("PPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""NPPRTELE_TIDT_CODE"" :" & """" & MiDataRow("NPPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""OPERADOR"" :" & """" & MiDataRow("OPERADOR").ToString & """,")
                            resb.Append("""NOPERADOR"" :" & """" & MiDataRow("NOPERADOR").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").Replace("""", "\""").ToString & """,")
                            resb.Append("""PPRCORR_NUM_SEQ"" :" & """" & MiDataRow("PPRCORR_NUM_SEQ").ToString & """,")
                            resb.Append("""PPRCORR_TIDT_CODE"" :" & """" & MiDataRow("PPRCORR_TIDT_CODE").ToString & """,")
                            resb.Append("""NPPRCORR_TIDT_CODE"" :" & """" & MiDataRow("NPPRCORR_TIDT_CODE").ToString & """,")
                            resb.Append("""CORREO"" :" & """" & MiDataRow("CORREO").ToString & """,")
                            resb.Append("""PPBIMAG_CODE"" :" & """" & MiDataRow("PPBIMAG_CODE").ToString & """,")
                            resb.Append("""PPBIMAG_NOMBRE"" :" & """" & MiDataRow("PPBIMAG_NOMBRE").ToString & """,")
                            resb.Append("""INICIO_ACTIVIDAD"" :" & """" & MiDataRow("INICIO_ACTIVIDAD").ToString & """,")
                            resb.Append("""TCON_CODE"" :" & """" & MiDataRow("TCON_CODE").ToString & """,")
                            resb.Append("""NTCON_CODE"" :" & """" & MiDataRow("NTCON_CODE").ToString & """,")
                            resb.Append("""RAZO_COME"" :" & """" & MiDataRow("RAZO_COME").ToString & """,")

                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""ACTIVIDAD"" :" & """" & MiDataRow("ACTIVIDAD").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                End If

                res = resb.ToString()

            Case "4.5"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim strRUC As String
                strRUC = ConfigurationManager.AppSettings("CodigoTipoDocumentoRUC")

                'If DOID_CODE = strRUC Then

                If (NRO.Substring(0, 1) = "2" And NRO.Length = 11) Then
                    If NRO = "2xxxxxxxxxx" Then
                        NRO = String.Empty
                    End If
                    dt = q.listar_Persona_Juridica_2(PIDM, NRO, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZONSOCIAL"" :" & """" & MiDataRow("RAZONSOCIAL").ToString.Replace("""", "\""") & """,")
                            resb.Append("""RAZO_COME"" :" & """" & MiDataRow("RAZO_COME").ToString.Replace("""", "\""") & """,")
                            resb.Append("""ACTIVIDAD"" :" & """" & MiDataRow("ACTIVIDAD").ToString & """,")
                            resb.Append("""CONTACTO"" :" & """" & MiDataRow("CONTACTO").ToString & """,")
                            If MiDataRow("CONTACTO_DATOS") Is DBNull.Value Then
                                resb.Append("""CONTACTO_DATOS"" :" & """"",")
                            Else
                                resb.Append("""CONTACTO_DATOS"" :" & MiDataRow("CONTACTO_DATOS").ToString & ",")
                            End If
                            resb.Append("""REP_LEGAL"" :" & """" & MiDataRow("REP_LEGAL").ToString & """,")
                            If MiDataRow("REPRESENTANTE_DATOS") Is DBNull.Value Then
                                resb.Append("""REPRESENTANTE_DATOS"" :" & """"",")
                            Else
                                resb.Append("""REPRESENTANTE_DATOS"" :" & MiDataRow("REPRESENTANTE_DATOS").ToString & ",")
                            End If
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                            resb.Append("""WEB"" :" & """" & MiDataRow("WEB").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString.Replace("""", "\""") & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""PPBIMAG_CODE"" :" & """" & MiDataRow("PPBIMAG_CODE").ToString & """,")
                            resb.Append("""PPBIMAG_NOMBRE"" :" & """" & MiDataRow("PPBIMAG_NOMBRE").ToString & """,")
                            resb.Append("""PPRTELE_NUM_SEQ"" :" & """" & MiDataRow("PPRTELE_NUM_SEQ").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""PPRCORR_NUM_SEQ"" :" & """" & MiDataRow("PPRCORR_NUM_SEQ").ToString & """,")
                            resb.Append("""CORREO"" :" & """" & MiDataRow("CORREO").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""FECHA_RETEN"" :" & """" & MiDataRow("FECHA_RETEN").ToString & """,")
                            resb.Append("""AGENTE_PERCEP_IND"" :" & """" & MiDataRow("AGENTE_PERCEP_IND").ToString & """,")
                            resb.Append("""FECHA_PERCEP"" :" & """" & MiDataRow("FECHA_PERCEP").ToString & """,")

                            resb.Append("""BUEN_CONTRIB_IND"" :" & """" & MiDataRow("BUEN_CONTRIB_IND").ToString & """,")
                            resb.Append("""FECHA_BUEN_CONTRIB"" :" & """" & MiDataRow("FECHA_BUEN_CONTRIB").ToString & """,")

                            resb.Append("""RELACIONADA_IND"" :" & """" & MiDataRow("RELACIONADA_IND").ToString & """,")
                            resb.Append("""RELACIONADA_CODE"" :" & """" & MiDataRow("RELACIONADA_CODE").ToString & """,")
                            resb.Append("""ENTIDAD_IND"" :" & """" & MiDataRow("ENTIDAD_IND").ToString & """,")
                            resb.Append("""INICIO_ACTIVIDAD"" :" & """" & MiDataRow("INICIO_ACTIVIDAD").ToString & """,")

                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""TCON_CODE"" :" & """" & MiDataRow("TCON_CODE").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                Else
                    If NRO = "xxxxxxxx" Then
                        NRO = String.Empty
                    End If


                    dt = q.listar_Persona_Natural_2(PIDM, DOID_CODE, NRO, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString.Replace("""", "\""") & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")

                            resb.Append("""BUEN_CONTRIB_IND"" :" & """" & MiDataRow("BUEN_CONTRIB_IND").ToString & """,")

                            resb.Append("""ENTIDAD_IND"" :" & """" & MiDataRow("ENTIDAD_IND").ToString & """,")
                            resb.Append("""TINO_CODE"" :" & """" & MiDataRow("TINO_CODE").ToString & """,")
                            resb.Append("""SEXO"" :" & """" & MiDataRow("SEXO").ToString & """,")
                            resb.Append("""ESCI_CODE"" :" & """" & MiDataRow("ESCI_CODE").ToString & """,")
                            resb.Append("""NESCI_CODE"" :" & """" & MiDataRow("NESCI_CODE").ToString & """,")
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                            resb.Append("""DOID_CODE"" :" & """" & MiDataRow("DOID_CODE").ToString & """,")
                            resb.Append("""NRO_RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""PPRTELE_NUM_SEQ"" :" & """" & MiDataRow("PPRTELE_NUM_SEQ").ToString & """,")
                            resb.Append("""PPRTELE_TIDT_CODE"" :" & """" & MiDataRow("PPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""NPPRTELE_TIDT_CODE"" :" & """" & MiDataRow("NPPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""OPERADOR"" :" & """" & MiDataRow("OPERADOR").ToString & """,")
                            resb.Append("""NOPERADOR"" :" & """" & MiDataRow("NOPERADOR").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").Replace("""", "\""").ToString & """,")
                            resb.Append("""PPRCORR_NUM_SEQ"" :" & """" & MiDataRow("PPRCORR_NUM_SEQ").ToString & """,")
                            resb.Append("""PPRCORR_TIDT_CODE"" :" & """" & MiDataRow("PPRCORR_TIDT_CODE").ToString & """,")
                            resb.Append("""NPPRCORR_TIDT_CODE"" :" & """" & MiDataRow("NPPRCORR_TIDT_CODE").ToString & """,")
                            resb.Append("""CORREO"" :" & """" & MiDataRow("CORREO").ToString & """,")
                            resb.Append("""PPBIMAG_CODE"" :" & """" & MiDataRow("PPBIMAG_CODE").ToString & """,")
                            resb.Append("""PPBIMAG_NOMBRE"" :" & """" & MiDataRow("PPBIMAG_NOMBRE").ToString & """,")
                            resb.Append("""INICIO_ACTIVIDAD"" :" & """" & MiDataRow("INICIO_ACTIVIDAD").ToString & """,")
                            resb.Append("""TCON_CODE"" :" & """" & MiDataRow("TCON_CODE").ToString & """,")
                            resb.Append("""NTCON_CODE"" :" & """" & MiDataRow("NTCON_CODE").ToString & """,")
                            resb.Append("""RAZO_COME"" :" & """" & MiDataRow("RAZO_COME").ToString & """,")

                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""ACTIVIDAD"" :" & """" & MiDataRow("ACTIVIDAD").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                End If

                res = resb.ToString()

            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = a.ListarActividad(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "6"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = r.ListarEmpresa(String.Empty, "A", USUA_ID)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("CORTO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "7"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim strDNI As String
                Dim numeroCon As DataTable

                strDNI = ConfigurationManager.AppSettings("CodigoTipoDocumentoDNI")

                'q.crear_Persona_contacto(PIDMEMPRESA, resArray(0).ToString, P_TIPOCONTA, "0")
                numeroCon = q.LISTA_NUMERO_CONTACTO(NRO, PIDMEMPRESA, P_TIPOCONTA)
                If numeroCon.Rows(0)("dni") = "NO" Then

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """NO""")
                    resb.Append("}")

                    resb.Append("]")

                ElseIf numeroCon.Rows(0)("dni") = "NOCONTA" Then

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """NOCONTA""")
                    resb.Append("}")

                    resb.Append("]")
                ElseIf numeroCon.Rows(0)("dni") = "ERROR" Then

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """ERROR""")
                    resb.Append("}")

                    resb.Append("]")

                    'resb.Append("ERROR")

                ElseIf numeroCon.Rows(0)("dni") = NRO Then

                    dt = q.listar_Persona_Natural("0", strDNI, NRO)

                    Dim dtTipo As DataTable
                    dtTipo = q.LISTAR_UPDATE_PRDETERMINADO(dt.Rows(0)("PIDM").ToString(), PIDMEMPRESA, "1", P_TIPOCONTA)


                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString & """,")
                            resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""TIPOCONTAC"" :" & """" & dtTipo.Rows(0)("TIPO").ToString() & """,")
                            resb.Append("""SUCCESS"" :" & """OK""")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                End If

                res = resb.ToString()
            Case "8"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = q.listar_Persona_Estereotipo(USUA_ID, CTLG_CODE, "A")
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.Datatable2Json(dt)
                End If
            Case "9"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = k.Listar_Tipo_Contribuyente(String.Empty, String.Empty, "A", TCON_TIPO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "NPN"
                context.Response.ContentType = "text/plain"
                TIPOIMAGEN = ConfigurationManager.AppSettings("TipoImagen").Split(","c)(0)

                If PPBIMAG Is Nothing Then
                    RUTA_PPBIMAG = "../../recursos/img/150x200.gif"
                Else
                    ' RUTA_PPBIMAG = GrabaImagen(TIPOIMAGEN, PPBIMAG, NRO, context)
                    RUTA_PPBIMAG = PPBIMAG
                End If

                PPBIMAG_NOMBRE_RUC = "../../recursos/img/150x200.gif"

                If FECHA <> String.Empty Then
                    FECHA = Utilities.fechaLocal(FECHA)
                End If

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = grabarPersonaNatural(APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND,
                                ENTIDAD_IND, TINO_CODE, USUA_ID, SEXO, ESCI_CODE, DOID_CODE,
                               NRO, NRO_RUC, ESTADO_IND, PPRTELE_TIDT_CODE, OPERADOR, NUMERO, PPRCORR_TIDT_CODE,
                               CORREO, TIPO, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE, RAZO_COME, ACTIVIDAD,
                               sCONDI_SUNAT, sESTADO_SUNAT, If(BUEN_CONTRIB_IND Is Nothing, "N", BUEN_CONTRIB_IND))

                resb.Append("[")
                resb.Append("{")
                resb.Append("""p_PPBIDEN_PIDM"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""p_PPBIDEN_ID"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""p_PPRTELE_NUM_SEQ"" :" & """" & resArray(2).ToString & """,")
                resb.Append("""p_PPRCORR_NUM_SEQ"" :" & """" & resArray(3).ToString & """,")
                resb.Append("""p_PPBIMAG_CODE"" :" & """" & resArray(4).ToString & """,")
                resb.Append("""p_MSG_RUC"" :" & """" & resArray(5).ToString & """,")
                resb.Append("""p_NOMBRE_COMPLETO"" :" & """" & resArray(6).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(7).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "MPN"
                context.Response.ContentType = "text/plain"
                TIPOIMAGEN = ConfigurationManager.AppSettings("TipoImagen").Split(","c)(0)

                If PPBIMAG Is Nothing Then
                    RUTA_PPBIMAG = PPBIMAG_URL
                Else
                    '  RUTA_PPBIMAG = GrabaImagen(TIPOIMAGEN, PPBIMAG, NRO, context)
                    RUTA_PPBIMAG = PPBIMAG
                End If

                If FECHA <> String.Empty Then
                    FECHA = Utilities.fechaLocal(FECHA)
                End If

                PPBIMAG_NOMBRE_RUC = "N" '"../../recursos/img/150x200.gif"

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = actualizarPersonaNatural(PIDM, APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, USUA_ID, SEXO, ESCI_CODE, NRO_RUC, PPRTELE_NUM_SEQ, PPRTELE_TIDT_CODE, _
                                                    OPERADOR, NUMERO, PPRCORR_NUM_SEQ, PPRCORR_TIDT_CODE, CORREO, PPBIMAG_CODE, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE, RAZO_COME, ACTIVIDAD, DOID_CODE, NRO,
                                                     If(BUEN_CONTRIB_IND Is Nothing, "N", BUEN_CONTRIB_IND))
                resb.Append("[")
                resb.Append("{")
                resb.Append("""p_MSG_RUC"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "NPJ"
                context.Response.ContentType = "text/plain"
                TIPOIMAGEN = ConfigurationManager.AppSettings("TipoImagen").Split(","c)(1)

                If PPBIMAG Is Nothing Then
                    RUTA_PPBIMAG = "../../recursos/img/150x200.gif"
                Else
                    '  RUTA_PPBIMAG = GrabaImagen(TIPOIMAGEN, PPBIMAG, NRO, context)
                    RUTA_PPBIMAG = PPBIMAG
                End If


                If FECHA_AGENTE_RETEN <> String.Empty Then
                    FECHA_AGENTE_RETEN = Utilities.fechaLocal(FECHA_AGENTE_RETEN)
                End If

                If FECHA_AGENTE_PERCEP <> String.Empty Then
                    FECHA_AGENTE_PERCEP = Utilities.fechaLocal(FECHA_AGENTE_PERCEP)
                End If

                If FECHA_BUEN_CONTRIB <> String.Empty Then
                    FECHA_BUEN_CONTRIB = Utilities.fechaLocal(FECHA_BUEN_CONTRIB)
                End If

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = grabarPersonaJuridica(APELL_PATE, RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL,
                                         WEB, AGENTE_RETEN_IND, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, FECHA_AGENTE_PERCEP,
                                         RELACIONADA_IND, RELACIONADA_CODE, ENTIDAD_IND, TINO_CODE, USUA_ID, DOID_CODE,
                                         NRO, ESTADO_IND, PPRTELE_TIDT_CODE, NUMERO, PPRCORR_TIDT_CODE, CORREO, TIPO, RUTA_PPBIMAG, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE,
                                         sCONDI_SUNAT, sESTADO_SUNAT,
                                         If(BUEN_CONTRIB_IND Is Nothing, "N", BUEN_CONTRIB_IND), If(FECHA_BUEN_CONTRIB Is Nothing, "", FECHA_BUEN_CONTRIB))
                resb.Append("[")
                resb.Append("{")
                resb.Append("""p_PPBIDEN_PIDM"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""p_PPBIDEN_ID"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""p_PPRTELE_NUM_SEQ"" :" & """" & resArray(2).ToString & """,")
                resb.Append("""p_PPRCORR_NUM_SEQ"" :" & """" & resArray(3).ToString & """,")
                resb.Append("""p_PPBIMAG_CODE"" :" & """" & resArray(4).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(5).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "MPJ"
                context.Response.ContentType = "text/plain"
                TIPOIMAGEN = ConfigurationManager.AppSettings("TipoImagen").Split(","c)(1)
                If PPBIMAG Is Nothing Then
                    RUTA_PPBIMAG = PPBIMAG_URL
                Else
                    ' RUTA_PPBIMAG = GrabaImagen(TIPOIMAGEN, PPBIMAG, NRO, context)
                    RUTA_PPBIMAG = PPBIMAG
                End If


                If FECHA_AGENTE_RETEN <> String.Empty Then
                    FECHA_AGENTE_RETEN = Utilities.fechaLocal(FECHA_AGENTE_RETEN)
                End If

                If FECHA_AGENTE_PERCEP <> String.Empty Then
                    FECHA_AGENTE_PERCEP = Utilities.fechaLocal(FECHA_AGENTE_PERCEP)
                End If

                If FECHA_BUEN_CONTRIB <> String.Empty Then
                    FECHA_BUEN_CONTRIB = Utilities.fechaLocal(FECHA_BUEN_CONTRIB)
                End If


                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = actualizarPersonaJuridica(PIDM, APELL_PATE, RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL, _
                                                     WEB, AGENTE_RETEN_IND, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, FECHA_AGENTE_PERCEP, _
                                                     RELACIONADA_IND, RELACIONADA_CODE, USUA_ID, DOID_CODE, NRO, PPRTELE_NUM_SEQ, _
                                                     NUMERO, PPRCORR_NUM_SEQ, CORREO, PPBIMAG_CODE, RUTA_PPBIMAG, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE,
                                                     If(BUEN_CONTRIB_IND Is Nothing, "N", BUEN_CONTRIB_IND), If(FECHA_BUEN_CONTRIB Is Nothing, "", FECHA_BUEN_CONTRIB))


                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "NPMN"
                context.Response.ContentType = "text/plain"
                RUTA_PPBIMAG = "../../recursos/img/150x200.gif"
                If FECHA <> String.Empty Then
                    FECHA = Utilities.fechaLocal(FECHA)
                End If
                PPBIMAG_NOMBRE_RUC = "../../recursos/img/150x200.gif"

                resArray = grabarPersonaNatural(APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND,
                                ENTIDAD_IND, TINO_CODE, USUA_ID, SEXO, ESCI_CODE, DOID_CODE,
                               NRO, NRO_RUC, ESTADO_IND, PPRTELE_TIDT_CODE, OPERADOR, NUMERO, PPRCORR_TIDT_CODE,
                               CORREO, TIPO, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, String.Empty, String.Empty, String.Empty, String.Empty, sCONDI_SUNAT, sESTADO_SUNAT, "N")
                If resArray(7).ToString = "OK" Then
                    q.crear_Persona_contacto(PIDMEMPRESA, resArray(0).ToString, P_TIPOCONTA, "0", "1")
                End If

                resb.Append("[")
                resb.Append("{")
                resb.Append("""p_PPBIDEN_PIDM"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""p_PPBIDEN_ID"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""p_PPRTELE_NUM_SEQ"" :" & """" & resArray(2).ToString & """,")
                resb.Append("""p_PPRCORR_NUM_SEQ"" :" & """" & resArray(3).ToString & """,")
                resb.Append("""p_PPBIMAG_CODE"" :" & """" & resArray(4).ToString & """,")
                resb.Append("""p_MSG_RUC"" :" & """" & resArray(5).ToString & """,")
                resb.Append("""p_NOMBRE_COMPLETO"" :" & """" & resArray(6).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(7).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

                'Case "SUNAT"
                '    context.Response.ContentType = "text/plain"
                '    Dim cs As New Nomade.ConsultasServer.DatosSunat


                '    Dim tempPath As String = "../../../bin"
                '    tempPath = context.Server.MapPath(tempPath)
                '    Dim downloadPath As String = context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes"))
                '    Dim count As Integer = 0
                '    res = "ERROR_CAPTCHA"

                '    If NRO.Length = 11 Then

                '        While res = "ERROR_CAPTCHA" And count < 50
                '            res = cs.ObtenerDataRUC(NRO, tempPath, downloadPath)

                '            count += 1
                '        End While
                '    Else
                '        While res = "ERROR_CAPTCHA" And count < 50
                '            res = cs.ObtenerDataDNI(NRO, tempPath, downloadPath)
                '            count += 1
                '        End While

                'End If

            'DPORTA_RF
            Case "SUNAT"
                context.Response.ContentType = "text/plain"
                Dim cs As New Nomade.ConsultasServer.DatosSunat

                'Dim path As String = "DatosSunat\"
                Dim tempPath As String = "../../../bin"
                tempPath = context.Server.MapPath(tempPath)
                Dim downloadPath As String = context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes"))
                'Dim downloadPath As String = context.Server.MapPath("~") & path
                Dim count As Integer = 0
                res = "ERROR_CAPTCHA"

                If NRO.Length = 11 Then

                    res = cs.ObtenerDataRUC(NRO, tempPath, downloadPath)
                Else
                    'res = "ERROR_CAPTCHA"
                    res = cs.ObtenerDataDNI(NRO, tempPath, downloadPath)

                End If

            'Case "CAPTCHA_RENIEC"
            '    context.Response.ContentType = "Text/plain"
            '    File.Delete(context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")) & "\reniec.jpg")
            '    Dim cr As New Nomade.ConsultasServer.DatosReniec
            '    Dim ruta As String = System.Configuration.ConfigurationManager.AppSettings("Imagenes") & cr.DescargaCaptcha(context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")))
            '    File.Copy(context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")) & "\reniec.tmp", context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")) & "\reniec.jpg")
            '    res = ruta.Replace("tmp", "jpg")

            'DPORTA_RF
            Case "RENIEC"
                'context.Response.ContentType = "Text/plain"
                'File.Delete(context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")) & "\reniec.jpg")
                'Dim cr As New Nomade.ConsultasServer.DatosReniec
                'res = cr.GetInfo(NRO, captcha, context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes")))

                context.Response.ContentType = "text/plain"
                Dim cr As New Nomade.ConsultasServer.DatosReniec

                'Dim path As String = "DatosReniec\"
                Dim tempPath As String = "../../../bin"
                tempPath = context.Server.MapPath(tempPath)
                Dim downloadPath As String = context.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings("Imagenes"))
                'Dim downloadPath As String = context.Server.MapPath("~") & path
                'Dim count As Integer = 0
                res = "SIN_RESULTADOS"

                If NRO.Length = 8 Then

                    res = cr.GetInfo(NRO, tempPath, downloadPath)
                Else
                    res = "SIN_RESULTADOS"
                    'res = cs.ObtenerDataDNI(NRO, tempPath, downloadPath)
                End If

            Case "LISTA"
                context.Response.ContentType = "text/html"
                dt = q.listar_Persona()
                res = ListaPersonaHtml(dt)
            Case "16"
                'context.Response.ContentType = "application/json; charset=utf-8"
                Dim pidmc As DataTable = q.LISTA_NUMERO_PIDM(DNICONT)
                If pidmc.Rows(0)("pidm") Is DBNull.Value Then

                    'resb.Append("ERROR")

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""SUCCESS"" :" & """ERROR""")
                    resb.Append("}")

                    resb.Append("]")
                Else

                    Dim strDNI As String

                    strDNI = ConfigurationManager.AppSettings("CodigoTipoDocumentoDNI")

                    q.crear_Persona_contacto(PIDMEMPRESA, pidmc.Rows(0)("pidm").ToString(), P_TIPOCONTA, "0", "1")

                    'resb.Append("OK")

                    dt = q.listar_Persona_Natural("0", strDNI, DNICONT)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString & """,")
                            resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""SUCCESS"" :" & """OK""")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If

                End If
                res = resb.ToString()
            Case "17"
                Dim dt As DataTable

                dt = q.LISTA_CONTACTOS(P_TIPO, P_PERSONA)
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRE"":""" & row("nombre").ToString & """,")
                        resb.Append("""TIPO"":""" & row("tipo").ToString & """,")
                        resb.Append("""PIDM"":""" & row("pidm").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("estado").ToString & """,")
                        resb.Append("""TIPOC"":""" & row("tipoc").ToString & """,")
                        resb.Append("""ACTIVO"":""" & row("activo").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")

                End If

                res = resb.ToString()
            Case "18"
                res = q.UPDATE_CONTACTO(PIDM, P_PERSONA, P_TIPO, P_TIPOGENERAL)
            Case "19"
                Dim dtc As DataTable
                context.Response.ContentType = "application/json; charset=utf-8"
                dtc = q.LISTA_CONTACTO_PRINCIPAL(P_PERSONA, P_TIPOCONTA)
                If Not dtc Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dtc.Rows
                        resb.Append("{")
                        resb.Append("""CONTACTO"":""" & row("CONTACTO").ToString & """,")
                        resb.Append("""PIDM_CONTAC"":""" & row("PIDM_CONTAC").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "20"
                res = q.UPDATE_CONTACTO_ACTIVO(PIDM, P_PERSONA, P_ACTIVO)

            Case "21"
                Dim dtTipo As DataTable
                dtTipo = q.LISTAR_UPDATE_PRDETERMINADO(PIDM, PIDMEMPRESA, "2", P_TIPOCONTA)

                res = dtTipo.Rows(0)("OK").ToString()

            Case "22"
                context.Response.ContentType = "Text/plain"
                res = q.fnActualizarDatosSunatContribuyente(PIDM, sCONDI_SUNAT, sESTADO_SUNAT)

            Case Else
        End Select

        context.Response.Write(res)

    End Sub

    Public Function grabarPersonaNatural(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String, ByVal p_PPBIDEN_AGENTE_RETEN_IND As String,
                                          ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String,
                                  ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String, ByVal p_PPBDOID_DOID_CODE As String,
                                  ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String,
                                  ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String,
                                  ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String, ByVal p_INICIO_ACTIVIDAD As String,
                                  ByVal p_TIPO_CONTRIBUYENTE As String, ByVal p_RAZO_COME As String, ByVal p_ACTIVIDAD As String, ByVal p_PPBIDEN_COND_SUNAT As String, ByVal p_PPBIDEN_ESTADO_SUNAT As String,
                                  ByVal p_PPBIDEN_BUEN_CONTRIB_IND As String) As Array
        Dim datos(8) As String
        datos = q.crear_Persona_Natural(p_PPBIDEN_APELL_PATE, p_PPBIDEN_APELL_MATE, p_PPBIDEN_NOMBRE, p_PPBIDEN_FECHA, p_PPBIDEN_AGENTE_RETEN_IND,
                                       p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID,
                                   p_PPBPEBA_SEXO, p_PPBPEBA_ESCI_CODE, p_PPBDOID_DOID_CODE,
                                   p_PPBDOID_NRO, p_PPBDOID_NRO_RUC, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_OPERADOR,
                                   p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE,
                                   p_PPRCORR_CORREO, p_PPBIMAG_TIPO, p_PPBIMAG_NOMBRE, p_PPBIMAG_NOMBRE_RUC, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE,
                                   p_RAZO_COME, p_ACTIVIDAD, p_PPBIDEN_COND_SUNAT, p_PPBIDEN_ESTADO_SUNAT, p_PPBIDEN_BUEN_CONTRIB_IND)
        Return datos
    End Function

    Public Function actualizarPersonaNatural(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String, _
                                               ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_USUA_ID As String, ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String, _
                                               ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPRTELE_NUM_SEQ As Integer, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String, ByVal p_PPRTELE_NUMERO As String, _
                                               ByVal p_PPRCORR_NUM_SEQ As Integer, ByVal p_PPRCORR_TIDT_CODE As String, ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_CODE As String, _
                                               ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String, ByVal p_INICIO_ACTIVIDAD As String, _
                                                ByVal p_TIPO_CONTRIBUYENTE As String, ByVal p_RAZO_COME As String, ByVal p_ACTIVIDAD As String, ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String,
                                                ByVal p_PPBIDEN_BUEN_CONTRIB_IND As String) As Array
        Dim datos(2) As String
        datos = q.Actualizar_Persona_Natural(p_PPBIDEN_PIDM, p_PPBIDEN_APELL_PATE, p_PPBIDEN_APELL_MATE, p_PPBIDEN_NOMBRE, p_PPBIDEN_FECHA, _
                                                p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_USUA_ID, p_PPBPEBA_SEXO, p_PPBPEBA_ESCI_CODE, _
                                                p_PPBDOID_NRO_RUC, p_PPRTELE_NUM_SEQ, p_PPRTELE_TIDT_CODE, p_PPRTELE_OPERADOR, p_PPRTELE_NUMERO, _
                                                p_PPRCORR_NUM_SEQ, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_CODE, _
                                                p_PPBIMAG_NOMBRE, p_PPBIMAG_NOMBRE_RUC, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, p_RAZO_COME, p_ACTIVIDAD, p_PPBDOID_DOID_CODE, p_PPBDOID_NRO, p_PPBIDEN_BUEN_CONTRIB_IND)
        Return datos
    End Function

    Public Function grabarPersonaJuridica(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_RAZO_COME As String, ByVal p_PPBIDEN_ACTIVIDAD As String,
                                        ByVal p_PPBIDEN_CONTACTO As String, ByVal p_PPBIDEN_REP_LEGAL As String, ByVal p_PPBIDEN_WEB As String,
                                        ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_RETEN As String,
                                        ByVal p_PPBIDEN_AGENTE_PERCEP_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_PERCEP As String, ByVal p_PPBIDEN_RELACIONADA_IND As String,
                                        ByVal p_PPBIDEN_RELACIONADA_CODE As String, ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String,
                                         ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String,
                                        ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String,
                                        ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_INICIO_ACTIVIDAD As String,
                                        ByVal p_TIPO_CONTRIBUYENTE As String, ByVal p_PPBIDEN_CONDI_SUNAT As String, ByVal p_PPBIDEN_ESTADO_SUNAT As String,
                                        ByVal p_PPBIDEN_BUEN_CONTRIB_IND As String, ByVal p_PPBIDEN_FECHA_BUEN_CONTRIB As String) As Array
        Dim datos(6) As String
        datos = q.crear_Persona_Juridica(p_PPBIDEN_APELL_PATE, p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO, p_PPBIDEN_REP_LEGAL,
                                         p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND, p_PPBIDEN_FECHA_AGENTE_PERCEP,
                                         p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE, p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE,
                                         p_PPBDOID_NRO, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_TIPO, p_PPBIMAG_NOMBRE, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE,
                                         p_PPBIDEN_CONDI_SUNAT, p_PPBIDEN_ESTADO_SUNAT, p_PPBIDEN_BUEN_CONTRIB_IND, p_PPBIDEN_FECHA_BUEN_CONTRIB)
        Return datos
    End Function

    Public Function actualizarPersonaJuridica(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_APELL_PATE As String,
                                                ByVal p_PPBIDEN_RAZO_COME As String, ByVal p_PPBIDEN_ACTIVIDAD As String, ByVal p_PPBIDEN_CONTACTO As String,
                                                ByVal p_PPBIDEN_REP_LEGAL As String, ByVal p_PPBIDEN_WEB As String, ByVal p_PPBIDEN_AGENTE_RETEN_IND As String,
                                                ByVal p_PPBIDEN_FECHA_AGENTE_RETEN As String, ByVal p_PPBIDEN_AGENTE_PERCEP_IND As String,
                                                ByVal p_PPBIDEN_FECHA_AGENTE_PERCEP As String, ByVal p_PPBIDEN_RELACIONADA_IND As String, ByVal p_PPBIDEN_RELACIONADA_CODE As String,
                                                ByVal p_PPBIDEN_USUA_ID As String, ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String,
                                                ByVal p_PPRTELE_NUM_SEQ As Integer, ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_NUM_SEQ As Integer,
                                                ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_CODE As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_INICIO_ACTIVIDAD As String, _
                                                ByVal p_TIPO_CONTRIBUYENTE As String,
                                                 ByVal p_PPBIDEN_BUEN_CONTRIB_IND As String, ByVal p_PPBIDEN_FECHA_BUEN_CONTRIB As String) As Array
        Dim datos(1) As String
        datos = q.actualizar_Persona_Juridica(p_PPBIDEN_PIDM, p_PPBIDEN_APELL_PATE,
                                                 p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO,
                                                 p_PPBIDEN_REP_LEGAL, p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND,
                                                 p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND,
                                                 p_PPBIDEN_FECHA_AGENTE_PERCEP, p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE,
                                                 p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE, p_PPBDOID_NRO,
                                                 p_PPRTELE_NUM_SEQ, p_PPRTELE_NUMERO, p_PPRCORR_NUM_SEQ,
                                                 p_PPRCORR_CORREO, p_PPBIMAG_CODE, p_PPBIMAG_NOMBRE, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE,
                                                 p_PPBIDEN_BUEN_CONTRIB_IND, p_PPBIDEN_FECHA_BUEN_CONTRIB)
        Return datos
    End Function

    Public Function VerificarPersona(ByVal p_DOID_CODE As String, ByVal p_NRO As String, ByVal p_ESTADO_IND As String) As String
        Dim existe As String
        dt = q.verificar_Existencia_Persona(p_DOID_CODE, p_NRO, p_ESTADO_IND)
        If Not (dt Is Nothing) Then
            existe = (dt.Rows(0)("VERIFICADO"))
        Else
            existe = "NOEXISTE"
        End If
        Return existe
    End Function

    Public Function GrabaImagen(ByVal p_TIPOIMAGEN As String, ByVal p_IMG As HttpPostedFile, ByVal p_NRO As String, ByVal p_CONTEXT As HttpContext) As String
        Dim rp As String = String.Empty

        Dim savepath As String = ""
        Dim tempPath As String = ""

        Dim extensionImagen As String = ""
        Dim filename As String = ""
        Dim rutaImagenes As String = ""

        tempPath = ConfigurationManager.AppSettings("PathImagePersona")
        savepath = p_CONTEXT.Server.MapPath(tempPath)
        extensionImagen = Path.GetExtension(p_IMG.FileName)

        If Not Directory.Exists(savepath) Then
            Directory.CreateDirectory(savepath)
        End If

        filename = Trim(p_TIPOIMAGEN) & "_" & Trim(p_NRO) & Trim(extensionImagen)

        p_IMG.SaveAs(savepath & "\" & filename)
        rp = tempPath & "/" & filename
        p_CONTEXT.Response.StatusCode = 200

        Return rp
    End Function

    Public Function ListaPersonaHtml(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblPersona' cellspacing='0' class='display DTTT_selectable'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>NOMBRES</th>"
            res += "<th align='center'>TIPO DOCUMENTO</th>"
            res += "<th align='center'>NRO. DOCUMENTO</th>"
            res += "<th align='center'>TIPO PERSONA</th>"
            res += "<th align='center'>TELÉFONO</th>"
            res += "<th align='center'>CORREO</th>"
            res += "<th align='center'>DIRECCION</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODIGO_TIPO_PERSONA").ToString() & "%" & dt.Rows(i)("CODIGO_TIPO_DOCUMENTO").ToString() & "%" & dt.Rows(i)("NRO_DOCUMENTO").ToString() & "'>"
                res += "<td align='left'>" & dt.Rows(i)("NOMBRE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TIPO_DOCUMENTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("NRO_DOCUMENTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("TIPO_PERSONA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TELEFONO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("CORREO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DIRECCION").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function


    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "DOID" Then
                    res += "<option value=""" & dt.Rows(i)(cvalue).ToString() & """ nemonico=""" & dt.Rows(i)("DESC_CORTA").ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    'Else
                    '    If clase = "CTABANC" Then
                    '        res += "<option firma=""" & dt.Rows(i)("FIRMA").ToString()

                    '        If dt.Rows(i)("AUT_PIDMS").ToString <> "" Then
                    '            res += """ aut1pim=""" & dt.Rows(i)("AUT_PIDMS").ToString().Split(",")(0)
                    '            res += """ aut1=""" & dt.Rows(i)("AUT_NOMBRES").ToString().Split(",")(0)
                    '            For j As Integer = 0 To dt.Rows(i)("AUT_PIDMS").ToString().Split(",").Length - 2
                    '                res += """ aut" & j + 2 & "pim=""" & dt.Rows(i)("AUT_PIDMS").ToString().Split(",")(j + 1)
                    '                res += """ aut" & j + 2 & "=""" & dt.Rows(i)("AUT_NOMBRES").ToString().Split(",")(j + 1)
                    '            Next

                    '        End If

                    '        res += """ moneda=""" & dt.Rows(i)("MONEDA_CODE").ToString()
                    '        res += """ pidm=""" & dt.Rows(i)("PIDM").ToString()
                    '        res += """ saldo=""" & dt.Rows(i)("SALDO").ToString()
                    '        res += """ value=""" & dt.Rows(i)(cvalue).ToString()
                    '        res += """>" & dt.Rows(i)(chtml).ToString() & " / SD:" & dt.Rows(i)("SALDO").ToString() & "</option>"
                    '    Else
                    '        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    '    End If
                End If
            Next

        Else
            res = "error"
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property




End Class



