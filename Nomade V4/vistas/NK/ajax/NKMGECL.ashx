<%@ WebHandler Language="VB" Class="NRMGEPR" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NRMGEPR : Implements IHttpHandler


    Dim OPCION, P_CODE As String

    Dim PIDM As Integer

    Dim APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, ENTIDAD_IND, TINO_CODE, USUA_ID As String

    Dim RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL, WEB, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, _
        FECHA_AGENTE_PERCEP, RELACIONADA_IND, RELACIONADA_CODE As String

    Dim SEXO, ESCI_CODE As String

    Dim DOID_CODE, NRO, NRO_RUC, ESTADO_IND As String

    Dim PPRTELE_NUM_SEQ As Integer
    Dim PPRTELE_TIDT_CODE, OPERADOR, NUMERO As String

    Dim PPRCORR_NUM_SEQ As Integer
    Dim PPRCORR_TIDT_CODE, CORREO As String

    Dim PPBIMAG_CODE, TIPO, PPBIMAG_NOMBRE, PPBIMAG_NOMBRE_RUC As String

    Dim PPBIMAG_URL, RUTA_PPBIMAG, PPBIMAG As String

    ' Dim PPBIMAG As HttpPostedFile


    Dim TIPOIMAGEN As String

    Dim TCON_TIPO As String

    Dim INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE As String

    Dim CTLG_CODE, ESTADO_CODE As String

    Dim PAGENUM, PAGESIZE As Integer

    Dim sCONDI_SUNAT, sESTADO_SUNAT As String

    Dim dt As DataTable

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

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        PIDM = context.Request("PIDM")
        P_CODE = context.Request("P_CODE")
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
        ESTADO_CODE = context.Request("ESTADO_CODE")

        PAGENUM = context.Request("PAGENUM")
        PAGESIZE = context.Request("PAGESIZE")

        sCONDI_SUNAT = context.Request("sCONDI_SUNAT")
        sESTADO_SUNAT = context.Request("sESTADO_SUNAT")

        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarDOCUMENTOS_IDENTIDAD(String.Empty, "A", String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""DESC_CORTA"" :" & """" & MiDataRow("DESC_CORTA").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
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

                If NRO.Substring(0, 1) = "2" And NRO.Length = 11 Then
                    dt = q.listar_Persona_Juridica(PIDM, NRO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZONSOCIAL"" :" & """" & MiDataRow("RAZONSOCIAL").ToString & """,")
                            resb.Append("""RAZO_COME"" :" & """" & MiDataRow("RAZO_COME").ToString & """,")
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
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
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
                    dt = q.listar_Persona_Natural(PIDM, DOID_CODE, NRO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString & """,")
                            resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""ENTIDAD_IND"" :" & """" & MiDataRow("ENTIDAD_IND").ToString & """,")
                            resb.Append("""TINO_CODE"" :" & """" & MiDataRow("TINO_CODE").ToString & """,")
                            resb.Append("""SEXO"" :" & """" & MiDataRow("SEXO").ToString & """,")
                            resb.Append("""ESCI_CODE"" :" & """" & MiDataRow("ESCI_CODE").ToString & """,")
                            resb.Append("""NESCI_CODE"" :" & """" & MiDataRow("NESCI_CODE").ToString & """,")
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                            resb.Append("""NRO_RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""PPRTELE_NUM_SEQ"" :" & """" & MiDataRow("PPRTELE_NUM_SEQ").ToString & """,")
                            resb.Append("""PPRTELE_TIDT_CODE"" :" & """" & MiDataRow("PPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""NPPRTELE_TIDT_CODE"" :" & """" & MiDataRow("NPPRTELE_TIDT_CODE").ToString & """,")
                            resb.Append("""OPERADOR"" :" & """" & MiDataRow("OPERADOR").ToString & """,")
                            resb.Append("""NOPERADOR"" :" & """" & MiDataRow("NOPERADOR").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
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
                dt = r.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
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
            Case "7"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim strDNI As String
                strDNI = ConfigurationManager.AppSettings("CodigoTipoDocumentoDNI")
                dt = q.listar_Persona_Natural("0", strDNI, NRO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""APELL_PATE"" :" & """" & MiDataRow("APELL_PATE").ToString & """,")
                        resb.Append("""APELL_MATE"" :" & """" & MiDataRow("APELL_MATE").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "8"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = q.listar_Persona_Estereotipo(USUA_ID, CTLG_CODE, "A")
                If Not (dt Is Nothing) Then
                    Dim MiDataRow As DataRow = dt.Rows(0)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CLIENTE_IND"" :" & """" & MiDataRow("CLIENTE_IND").ToString & """,")
                    resb.Append("""PROVEEDOR_IND"" :" & """" & MiDataRow("PROVEEDOR_IND").ToString & """,")
                    resb.Append("""EMPLEADO_IND"" :" & """" & MiDataRow("EMPLEADO_IND").ToString & """,")
                    resb.Append("""AFP_IND"" :" & """" & MiDataRow("AFP_IND").ToString & """,")
                    resb.Append("""BANCO_IND"" :" & """" & MiDataRow("BANCO_IND").ToString & """,")
                    resb.Append("""EPS_IND"" :" & """" & MiDataRow("EPS_IND").ToString & """,")
                    resb.Append("""ACCIONISTA_IND"" :" & """" & MiDataRow("ACCIONISTA_IND").ToString & """,")
                    resb.Append("""TRANSPORTISTA_IND"" :" & """" & MiDataRow("TRANSPORTISTA_IND").ToString & """,")
                    resb.Append("""CHOFER_IND"" :" & """" & MiDataRow("CHOFER_IND").ToString & """,")
                    resb.Append("""PROPIETARIO_VEHICULO_IND"" :" & """" & MiDataRow("PROPIETARIO_VEHICULO_IND").ToString & """,")
                    resb.Append("""ASEGURADORA_IND"" :" & """" & MiDataRow("ASEGURADORA_IND").ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
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
                               CORREO, TIPO, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE, RAZO_COME, ACTIVIDAD)
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

                PPBIMAG_NOMBRE_RUC = "../../recursos/img/150x200.gif"

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = actualizarPersonaNatural(PIDM, APELL_PATE, APELL_MATE, NOMBRE, FECHA, AGENTE_RETEN_IND, USUA_ID, SEXO, ESCI_CODE, NRO_RUC, PPRTELE_NUM_SEQ, PPRTELE_TIDT_CODE,
                                                    OPERADOR, NUMERO, PPRCORR_NUM_SEQ, PPRCORR_TIDT_CODE, CORREO, PPBIMAG_CODE, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE, RAZO_COME, ACTIVIDAD)
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

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = grabarPersonaJuridica(APELL_PATE, RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL,
                                         WEB, AGENTE_RETEN_IND, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, FECHA_AGENTE_PERCEP,
                                         RELACIONADA_IND, RELACIONADA_CODE, ENTIDAD_IND, TINO_CODE, USUA_ID, DOID_CODE,
                                         NRO, ESTADO_IND, PPRTELE_TIDT_CODE, NUMERO, PPRCORR_TIDT_CODE, CORREO, TIPO, RUTA_PPBIMAG, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE)
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

                If INICIO_ACTIVIDAD <> String.Empty Then
                    INICIO_ACTIVIDAD = Utilities.fechaLocal(INICIO_ACTIVIDAD)
                End If

                resArray = actualizarPersonaJuridica(PIDM, APELL_PATE, RAZO_COME, ACTIVIDAD, CONTACTO, REP_LEGAL,
                                                     WEB, AGENTE_RETEN_IND, FECHA_AGENTE_RETEN, AGENTE_PERCEP_IND, FECHA_AGENTE_PERCEP,
                                                     RELACIONADA_IND, RELACIONADA_CODE, USUA_ID, DOID_CODE, NRO, PPRTELE_NUM_SEQ,
                                                     NUMERO, PPRCORR_NUM_SEQ, CORREO, PPBIMAG_CODE, RUTA_PPBIMAG, INICIO_ACTIVIDAD, TIPO_CONTRIBUYENTE)



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
                               CORREO, TIPO, RUTA_PPBIMAG, PPBIMAG_NOMBRE_RUC, String.Empty, String.Empty, String.Empty, String.Empty)
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
            'Case "LCLIENTE" 'DPORTA
            '    context.Response.ContentType = "application/json; charset=utf-8"
            '    Dim p As New Nomade.NC.NCECliente("Bn")
            '    Dim dt As New DataTable
            '    Dim sb As New StringBuilder()
            '    dt = p.ListarCliente2(0, String.Empty, CTLG_CODE, "S")
            '    If Not dt Is Nothing Then
            '        sb.Append("[")
            '        For Each row As DataRow In dt.Rows
            '            sb.Append("{")
            '            sb.Append("""ID"":""" & row("ID").ToString & """,")
            '            sb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """,")
            '            sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
            '            sb.Append("""CODIGO_TIPO_DOCUMENTO"":""" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
            '            sb.Append("""TIPO_DOCUMENTO"":""" & row("TIPO_DOCUMENTO").ToString & """,")
            '            sb.Append("""NRO_DOCUMENTO"":""" & row("NRO_DOCUMENTO").ToString & """,")
            '            sb.Append("""NRO_RUC"":""" & row("NRO_RUC").ToString & """,")
            '            sb.Append("""CATE_DESC"":""" & row("CATE_DESC").ToString & """,")
            '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
            '            sb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
            '            sb.Append("""FECHA_INICIO"":{""display"":""" & row("FECHA_INICIO").ToString & """,""order"":""" & String.Join("", row("FECHA_INICIO").ToString.Split("/").Reverse()) & """},")
            '            sb.Append("""CTLG_DESC"":""" & row("CTLG_DESC").ToString & """,")
            '            sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
            '            sb.Append("""DIRECCION"":""" & row("DIRECCION").ToString & """")
            '            sb.Append("},")
            '        Next
            '        sb.Append("-")
            '        sb.Replace("},-", "}")
            '        sb.Append("]")
            '    End If
            '    res = sb.ToString()
            Case "LCLIENTE3" 'DPORTA
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim p As New Nomade.NC.NCECliente("Bn")
                Dim dt As New DataTable
                Dim sb As New StringBuilder()
                dt = p.ListarCliente3(0, String.Empty, CTLG_CODE, ESTADO_CODE, "S")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""ID"":""" & row("ID").ToString & """,")
                        sb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """,")
                        sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        sb.Append("""CODIGO_TIPO_DOCUMENTO"":""" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                        sb.Append("""TIPO_DOCUMENTO"":""" & row("TIPO_DOCUMENTO").ToString & """,")
                        sb.Append("""NRO_DOCUMENTO"":""" & row("NRO_DOCUMENTO").ToString & """,")
                        sb.Append("""NRO_RUC"":""" & row("NRO_RUC").ToString & """,")
                        sb.Append("""CATE_DESC"":""" & row("CATE_DESC").ToString & """,")
                        sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                        sb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")
                        sb.Append("""FECHA_INICIO"":{""display"":""" & row("FECHA_INICIO").ToString & """,""order"":""" & String.Join("", row("FECHA_INICIO").ToString.Split("/").Reverse()) & """},")
                        sb.Append("""CTLG_DESC"":""" & row("CTLG_DESC").ToString & """,")
                        sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                        sb.Append("""DIRECCION"":""" & row("DIRECCION").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("-")
                    sb.Replace("},-", "}")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "CAMBIO_ESTADO" 'DPORTA
                context.Response.ContentType = "text/plain"
                Dim p As New Nomade.NC.NCECliente("Bn")
                res = p.CambiarEstadoCliente(P_CODE, USUA_ID, CTLG_CODE)
            Case "LISTA"
                context.Response.ContentType = "text/html"
                dt = q.listar_Persona()
                res = ListaPersonaHtml(dt)
            Case Else
        End Select

        context.Response.Write(res)

    End Sub

    Public Function grabarPersonaNatural(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String, ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, _
                                          ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String, _
                                  ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String, ByVal p_PPBDOID_DOID_CODE As String, _
                                  ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String, _
                                  ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String, _
                                  ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String, ByVal p_INICIO_ACTIVIDAD As String, _
                                  ByVal p_TIPO_CONTRIBUYENTE As String, ByVal p_RAZO_COME As String, ByVal p_ACTIVIDAD As String) As Array
        Dim datos(8) As String
        datos = q.crear_Persona_Natural(p_PPBIDEN_APELL_PATE, p_PPBIDEN_APELL_MATE, p_PPBIDEN_NOMBRE, p_PPBIDEN_FECHA, p_PPBIDEN_AGENTE_RETEN_IND,
                                       p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID,
                                   p_PPBPEBA_SEXO, p_PPBPEBA_ESCI_CODE, p_PPBDOID_DOID_CODE,
                                   p_PPBDOID_NRO, p_PPBDOID_NRO_RUC, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_OPERADOR,
                                   p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE,
                                   p_PPRCORR_CORREO, p_PPBIMAG_TIPO, p_PPBIMAG_NOMBRE, p_PPBIMAG_NOMBRE_RUC, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, p_RAZO_COME, p_ACTIVIDAD, sCONDI_SUNAT, sESTADO_SUNAT)
        Return datos
    End Function

    Public Function actualizarPersonaNatural(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String, _
                                               ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_USUA_ID As String, ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String, _
                                               ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPRTELE_NUM_SEQ As Integer, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String, ByVal p_PPRTELE_NUMERO As String, _
                                               ByVal p_PPRCORR_NUM_SEQ As Integer, ByVal p_PPRCORR_TIDT_CODE As String, ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_CODE As String, _
                                               ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String, ByVal p_INICIO_ACTIVIDAD As String, _
                                                ByVal p_TIPO_CONTRIBUYENTE As String, ByVal p_RAZO_COME As String, ByVal p_ACTIVIDAD As String) As Array
        Dim datos(2) As String
        datos = q.Actualizar_Persona_Natural(p_PPBIDEN_PIDM, p_PPBIDEN_APELL_PATE, p_PPBIDEN_APELL_MATE, p_PPBIDEN_NOMBRE, p_PPBIDEN_FECHA, _
                                                p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_USUA_ID, p_PPBPEBA_SEXO, p_PPBPEBA_ESCI_CODE, _
                                                p_PPBDOID_NRO_RUC, p_PPRTELE_NUM_SEQ, p_PPRTELE_TIDT_CODE, p_PPRTELE_OPERADOR, p_PPRTELE_NUMERO, _
                                                p_PPRCORR_NUM_SEQ, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_CODE, _
                                                p_PPBIMAG_NOMBRE, p_PPBIMAG_NOMBRE_RUC, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, p_RAZO_COME, p_ACTIVIDAD)
        Return datos
    End Function

    Public Function grabarPersonaJuridica(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_RAZO_COME As String, ByVal p_PPBIDEN_ACTIVIDAD As String,
                                        ByVal p_PPBIDEN_CONTACTO As String, ByVal p_PPBIDEN_REP_LEGAL As String, ByVal p_PPBIDEN_WEB As String,
                                        ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_RETEN As String,
                                        ByVal p_PPBIDEN_AGENTE_PERCEP_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_PERCEP As String, ByVal p_PPBIDEN_RELACIONADA_IND As String,
                                        ByVal p_PPBIDEN_RELACIONADA_CODE As String, ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String,
                                         ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String,
                                        ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String,
                                        ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_INICIO_ACTIVIDAD As String, _
                                                ByVal p_TIPO_CONTRIBUYENTE As String) As Array
        Dim datos(6) As String
        datos = q.crear_Persona_Juridica(p_PPBIDEN_APELL_PATE, p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO, p_PPBIDEN_REP_LEGAL,
                                         p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND, p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND, p_PPBIDEN_FECHA_AGENTE_PERCEP,
                                         p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE, p_PPBIDEN_ENTIDAD_IND, p_PPBIDEN_TINO_CODE, p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE,
                                         p_PPBDOID_NRO, p_PPBDOID_ESTADO_IND, p_PPRTELE_TIDT_CODE, p_PPRTELE_NUMERO, p_PPRCORR_TIDT_CODE, p_PPRCORR_CORREO, p_PPBIMAG_TIPO, p_PPBIMAG_NOMBRE,
                                         p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE, sCONDI_SUNAT, sESTADO_SUNAT)
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
                                                ByVal p_TIPO_CONTRIBUYENTE As String) As Array
        Dim datos(1) As String
        datos = q.actualizar_Persona_Juridica(p_PPBIDEN_PIDM, p_PPBIDEN_APELL_PATE,
                                                 p_PPBIDEN_RAZO_COME, p_PPBIDEN_ACTIVIDAD, p_PPBIDEN_CONTACTO,
                                                 p_PPBIDEN_REP_LEGAL, p_PPBIDEN_WEB, p_PPBIDEN_AGENTE_RETEN_IND,
                                                 p_PPBIDEN_FECHA_AGENTE_RETEN, p_PPBIDEN_AGENTE_PERCEP_IND,
                                                 p_PPBIDEN_FECHA_AGENTE_PERCEP, p_PPBIDEN_RELACIONADA_IND, p_PPBIDEN_RELACIONADA_CODE,
                                                 p_PPBIDEN_USUA_ID, p_PPBDOID_DOID_CODE, p_PPBDOID_NRO,
                                                 p_PPRTELE_NUM_SEQ, p_PPRTELE_NUMERO, p_PPRCORR_NUM_SEQ,
                                                 p_PPRCORR_CORREO, p_PPBIMAG_CODE, p_PPBIMAG_NOMBRE, p_INICIO_ACTIVIDAD, p_TIPO_CONTRIBUYENTE)
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

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property



End Class