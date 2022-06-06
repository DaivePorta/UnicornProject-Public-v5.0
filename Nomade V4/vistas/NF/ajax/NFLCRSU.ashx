<%@ WebHandler Language="VB" Class="NFLCRSU" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NFLCRSU : Implements IHttpHandler
    Dim res As String
    Dim resb As New StringBuilder
    Dim p As New Nomade.FI.FIIgv("bn")
    Dim dt As DataTable
    
    Dim pMesIni As String
    Dim pAnioIni As String
    Dim pMesFin As String
    Dim pAnioFin As String
    Dim opcion As String
    
    
    Dim dig0 As String
    Dim dig1 As String
    Dim dig2 As String
    Dim dig3 As String
    Dim dig4 As String
    Dim dig5 As String
    Dim dig6 As String
    Dim dig7 As String
    Dim dig8 As String
    Dim dig9 As String
    Dim dig10 As String
    Dim periodo As String
    Dim ctlg_code As String
    Dim panio As String
    Dim pfechaRenta As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        
        opcion = context.Request("opcion")
        pMesIni = context.Request("pmesini")
        pAnioIni = context.Request("panioini")
        pMesFin = context.Request("pmesfin")
        pAnioFin = context.Request("paniofin")
        
        dig0 = context.Request("dig0")
        dig1 = context.Request("dig1")
        dig2 = context.Request("dig2")
        dig3 = context.Request("dig3")
        dig4 = context.Request("dig4")
        dig5 = context.Request("dig5")
        dig6 = context.Request("dig6")
        dig7 = context.Request("dig7")
        dig8 = context.Request("dig8")
        dig9 = context.Request("dig9")
        dig10 = context.Request("dig10")
        periodo = context.Request("periodo")
        ctlg_code = context.Request("ctlg_code")
        panio = context.Request("panio")
        pfechaRenta = context.Request("pfechaRenta")
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListaCronograma(pAnioIni & pMesIni, pAnioFin & pMesFin)
                    Dim perido_ini As String = pAnioIni & pMesIni
                    Dim perido_fin As String = pAnioFin & pMesFin
                    Dim ult_perido As String = "0"
                    Dim peridos_pendientes As Integer = 0
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""pertrib"" :" & """" & MiDataRow("pertrib").ToString & """,")
                            
                            If MiDataRow("dig0").ToString.Length >= 10 Then
                                dig0 = MiDataRow("dig0").ToString.Substring(0, 10)
                            Else
                                dig0 = ""
                            End If
                            resb.Append("""dig0"" :" & """" & dig0 & """,")
                            
                            If MiDataRow("dig1").ToString.Length >= 10 Then
                                dig1 = MiDataRow("dig1").ToString.Substring(0, 10)
                            Else
                                dig1 = ""
                            End If
                            resb.Append("""dig1"" :" & """" & dig1 & """,")
                            
                            If MiDataRow("dig2").ToString.Length >= 10 Then
                                dig2 = MiDataRow("dig2").ToString.Substring(0, 10)
                            Else
                                dig2 = ""
                            End If
                            resb.Append("""dig2"" :" & """" & dig2 & """,")
                            
                            If MiDataRow("dig3").ToString.Length >= 10 Then
                                dig3 = MiDataRow("dig3").ToString.Substring(0, 10)
                            Else
                                dig3 = ""
                            End If
                            resb.Append("""dig3"" :" & """" & dig3 & """,")
                            
                            If MiDataRow("dig4").ToString.Length >= 10 Then
                                dig4 = MiDataRow("dig4").ToString.Substring(0, 10)
                            Else
                                dig4 = ""
                            End If
                            resb.Append("""dig4"" :" & """" & dig4 & """,")
                            
                            If MiDataRow("dig5").ToString.Length >= 10 Then
                                dig5 = MiDataRow("dig5").ToString.Substring(0, 10)
                            Else
                                dig5 = ""
                            End If
                            resb.Append("""dig5"" :" & """" & dig5 & """,")
                            
                            If MiDataRow("dig6").ToString.Length >= 10 Then
                                dig6 = MiDataRow("dig6").ToString.Substring(0, 10)
                            Else
                                dig6 = ""
                            End If
                            resb.Append("""dig6"" :" & """" & dig6 & """,")
                            
                            If MiDataRow("dig7").ToString.Length >= 10 Then
                                dig7 = MiDataRow("dig7").ToString.Substring(0, 10)
                            Else
                                dig7 = ""
                            End If
                            resb.Append("""dig7"" :" & """" & dig7 & """,")
                            
                            If MiDataRow("dig8").ToString.Length >= 10 Then
                                dig8 = MiDataRow("dig8").ToString.Substring(0, 10)
                            Else
                                dig8 = ""
                            End If
                            resb.Append("""dig8"" :" & """" & dig8 & """,")
                            
                            If MiDataRow("dig9").ToString.Length >= 10 Then
                                dig9 = MiDataRow("dig9").ToString.Substring(0, 10)
                            Else
                                dig9 = ""
                            End If
                            resb.Append("""dig9"" :" & """" & dig9 & """,")
                            
                            If MiDataRow("dig10").ToString.Length >= 10 Then
                                dig10 = MiDataRow("dig10").ToString.Substring(0, 10)
                            Else
                                dig10 = ""
                            End If
                            resb.Append("""dig10"" :" & """" & dig10 & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                            ult_perido = MiDataRow("pertrib")
                        Next
                       
                        
                        peridos_pendientes = (Convert.ToInt32(perido_fin)) - (Convert.ToInt32(ult_perido))
                        If (peridos_pendientes > 0) Then
                            Dim fecha As String = ""
                            Dim nuevo_periodo As Integer = Convert.ToInt32(ult_perido)
                            For cont As Integer = 1 To peridos_pendientes
                                nuevo_periodo = nuevo_periodo + 1
                                resb.Append("{")
                                resb.Append("""pertrib"" :" & """" & nuevo_periodo & """,")
                                resb.Append("""dig0"" :" & """" & fecha & """,")
                                resb.Append("""dig1"" :" & """" & fecha & """,")
                                resb.Append("""dig2"" :" & """" & fecha & """,")
                                resb.Append("""dig3"" :" & """" & fecha & """,")
                                resb.Append("""dig4"" :" & """" & fecha & """,")
                                resb.Append("""dig5"" :" & """" & fecha & """,")
                                resb.Append("""dig6"" :" & """" & fecha & """,")
                                resb.Append("""dig7"" :" & """" & fecha & """,")
                                resb.Append("""dig8"" :" & """" & fecha & """,")
                                resb.Append("""dig9"" :" & """" & fecha & """,")
                                resb.Append("""dig10"" :" & """" & fecha & """,")
                                resb.Append("""ESTADO"" :" & """" & fecha & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            
                        End If
                            
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        Dim perido As String = pAnioIni & pMesIni
                        Dim per_actual As Integer = Convert.ToInt32(perido)
                        Dim fecha As String = ""
                        Dim anio_acutual As Integer = pAnioIni
                        'Dim anio_registrado As Integer
                        Dim meses_reg As Integer = Convert.ToInt32(pMesFin) - Convert.ToInt32(pMesIni) + 1 
                        'Dim anio_reg As String
                        Dim periodo_reg As Integer = 0
                        periodo_reg = per_actual
                        resb.Append("[")
                        For cont As Integer = 1 To meses_reg
                                
                            resb.Append("{")
                            resb.Append("""pertrib"" :" & """" & periodo_reg & """,")
                            resb.Append("""dig0"" :" & """" & fecha & """,")
                            resb.Append("""dig1"" :" & """" & fecha & """,")
                            resb.Append("""dig2"" :" & """" & fecha & """,")
                            resb.Append("""dig3"" :" & """" & fecha & """,")
                            resb.Append("""dig4"" :" & """" & fecha & """,")
                            resb.Append("""dig5"" :" & """" & fecha & """,")
                            resb.Append("""dig6"" :" & """" & fecha & """,")
                            resb.Append("""dig7"" :" & """" & fecha & """,")
                            resb.Append("""dig8"" :" & """" & fecha & """,")
                            resb.Append("""dig9"" :" & """" & fecha & """,")
                            resb.Append("""dig10"" :" & """" & fecha & """,")
                            resb.Append("""ESTADO"" :" & """" & fecha & """")
                            resb.Append("}")
                            resb.Append(",")
                            periodo_reg = periodo_reg + 1
                        Next
                            
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                        
                    'End If
                    res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "text/plain"
                 
                    res = p.fGrabarCronograma(periodo, Utilities.fechaLocal(dig0), _
                                              IIf(dig1 <> "", Utilities.fechaLocal(dig1), Nothing), _
                                              IIf(dig2 <> "", Utilities.fechaLocal(dig2), Nothing), _
                                              IIf(dig3 <> "", Utilities.fechaLocal(dig3), Nothing), _
                                              IIf(dig4 <> "", Utilities.fechaLocal(dig4), Nothing), _
                                              IIf(dig5 <> "", Utilities.fechaLocal(dig5), Nothing), _
                                              IIf(dig6 <> "", Utilities.fechaLocal(dig6), Nothing), _
                                              IIf(dig7 <> "", Utilities.fechaLocal(dig7), Nothing), _
                                              IIf(dig8 <> "", Utilities.fechaLocal(dig8), Nothing), _
                                              IIf(dig9 <> "", Utilities.fechaLocal(dig9), Nothing), _
                                              IIf(dig10 <> "", Utilities.fechaLocal(dig10), Nothing))
                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListaPeriodosCronograma(pAnioIni, "A")
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""PERIODO"" :" & """" & MiDataRow("PERIODO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    
                    context.Response.ContentType = "text/plain"
                    res = p.fCompletarPeriodo(periodo, pAnioIni)
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fListaAsignacionesCronogramaEmpresas("", "", panio, "")
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""EMPRESA"":" & """" & MiDataRow("EMPRESA").ToString & """,")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            
                            If MiDataRow("ENERO").ToString.Equals("") Then
                                resb.Append("""ENERO"" :" & """" & MiDataRow("ENERO").ToString & """,")
                            Else
                                resb.Append("""ENERO"" :" & """" & MiDataRow("ENERO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("FEBRERO").ToString.Equals("") Then
                                resb.Append("""FEBRERO"" :" & """" & MiDataRow("FEBRERO").ToString & """,")
                            Else
                                resb.Append("""FEBRERO"" :" & """" & MiDataRow("FEBRERO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("MARZO").ToString.Equals("") Then
                                resb.Append("""MARZO"" :" & """" & MiDataRow("MARZO").ToString & """,")
                            Else
                                resb.Append("""MARZO"" :" & """" & MiDataRow("MARZO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("ABRIL").ToString.Equals("") Then
                                resb.Append("""ABRIL"" :" & """" & MiDataRow("ABRIL").ToString & """,")
                            Else
                                resb.Append("""ABRIL"" :" & """" & MiDataRow("ABRIL").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("MAYO").ToString.Equals("") Then
                                resb.Append("""MAYO"" :" & """" & MiDataRow("MAYO").ToString & """,")
                            Else
                                resb.Append("""MAYO"" :" & """" & MiDataRow("MAYO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("JUNIO").ToString.Equals("") Then
                                resb.Append("""JUNIO"" :" & """" & MiDataRow("JUNIO").ToString & """,")
                            Else
                                resb.Append("""JUNIO"" :" & """" & MiDataRow("JUNIO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("JULIO").ToString.Equals("") Then
                                resb.Append("""JULIO"" :" & """" & MiDataRow("JULIO").ToString & """,")
                            Else
                                resb.Append("""JULIO"" :" & """" & MiDataRow("JULIO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("AGOSTO").ToString.Equals("") Then
                                resb.Append("""AGOSTO"" :" & """" & MiDataRow("AGOSTO").ToString & """,")
                            Else
                                resb.Append("""AGOSTO"" :" & """" & MiDataRow("AGOSTO").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("SETIEMBRE").ToString.Equals("") Then
                                resb.Append("""SETIEMBRE"" :" & """" & MiDataRow("SETIEMBRE").ToString & """,")
                            Else
                                resb.Append("""SETIEMBRE"" :" & """" & MiDataRow("SETIEMBRE").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("OCTUBRE").ToString.Equals("") Then
                                resb.Append("""OCTUBRE"" :" & """" & MiDataRow("OCTUBRE").ToString & """,")
                            Else
                                resb.Append("""OCTUBRE"" :" & """" & MiDataRow("OCTUBRE").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("NOVIEMBRE").ToString.Equals("") Then
                                resb.Append("""NOVIEMBRE"" :" & """" & MiDataRow("NOVIEMBRE").ToString & """,")
                            Else
                                resb.Append("""NOVIEMBRE"" :" & """" & MiDataRow("NOVIEMBRE").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("DICIEMBRE").ToString.Equals("") Then
                                resb.Append("""DICIEMBRE"" :" & """" & MiDataRow("DICIEMBRE").ToString & """,")
                            Else
                                resb.Append("""DICIEMBRE"" :" & """" & MiDataRow("DICIEMBRE").ToString().Substring(0, 10) & """,")
                            End If
                            
                            If MiDataRow("RENTA_ANUAL").ToString.Equals("") Then
                                resb.Append("""RENTA_ANUAL"" :" & """" & MiDataRow("RENTA_ANUAL").ToString & """")
                            Else
                                resb.Append("""RENTA_ANUAL"" :" & """" & MiDataRow("RENTA_ANUAL").ToString().Substring(0, 10) & """")
                            End If
                            
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    End If
                            
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fCrearAsignacionesCronogramaEmpresas(panio)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RESPUESTA"" :" & """" & MiDataRow("RESPUESTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    End If
                Case "7"
                    context.Response.ContentType = "text/plain"
                     
                     res = p.fCompletarAsignacionEmpresas(ctlg_code, panio, IIf(pfechaRenta <> "", Utilities.fechaLocal(pfechaRenta), Nothing))
                    
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