<%@ WebHandler Language="VB" Class="NNMAFPE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMAFPE : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_MES, p_COD_PLANILLA, p_ANIO, p_TIPO As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_TIPO = context.Request("p_TIPO")
        p_MES = context.Request("p_MES")
        p_ANIO = context.Request("p_ANIO")
        p_COD_PLANILLA = context.Request("p_COD_PLANILLA")
        
        Try
        
            Select Case OPCION
                Case "0" 'lista planilla a cerrar
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    dt = NNPlanilla.Lista_Planillas_Cerradas(p_CTLG_CODE, p_TIPO)
                    If Not (dt Is Nothing) Then
                      
                        res = Utilities.Datatable2Json(dt)
                    End If
                Case "1" 'arma tabla
                    res = Arma_Tabla()
        
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
    
    
    Public Function Arma_Tabla() As String
        
        Dim dt_Datos_Iniciales_AfpNet As New DataTable
        Dim dt_Contrato_Emp As New DataTable
        Dim dt_cab_planilla As New DataTable
        Dim dt_peri_s_remu As New DataTable
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
        dt_Datos_Iniciales_AfpNet = NNPlanilla.Carga_Data_Ecxel_afpnet(p_COD_PLANILLA)
        dt_Contrato_Emp = NCEEmpleado.Lista_Contrato_Empl(Nothing, "", "", "", "")
        dt_cab_planilla = NNPlanilla.Lista_Cabecera_Planilla(p_CTLG_CODE, p_MES, p_ANIO)
        dt_peri_s_remu = NNPlanilla.Listar_Periodo_Sin_Remuneracion(p_CTLG_CODE, "", "")
       
        Dim res = ""
        Dim fecha_ini As New DateTime(p_ANIO, p_MES, 1)
        Dim fecha_fin As DateTime = fecha_ini.AddMonths(1).AddDays(-1)
        
     
        Try
            
       
        
        If Not dt_Datos_Iniciales_AfpNet Is Nothing Then
           
            For i As Integer = 0 To dt_Datos_Iniciales_AfpNet.Rows.Count - 1
                
                ' "\r\n"
                res += dt_Datos_Iniciales_AfpNet(i)("SEQ").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("CUSSP").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("TIPO_DNI").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("DNI").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("APE_PA").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("APE_MA").ToString + ","
                res += dt_Datos_Iniciales_AfpNet(i)("NOMBRES").ToString + ","
              
                If Not dt_Contrato_Emp Is Nothing Then
                    Dim filtro = "PIDM = '" + dt_Datos_Iniciales_AfpNet(i)("PIDM").ToString + "'"
                    Dim row() As DataRow = dt_Contrato_Emp.Select(filtro)
                    Dim bool = False
                    Dim bool2 = False
                    Dim bool3 = False
                    
                    
                    If row.Count > 0 Then
                        For j As Integer = 0 To row.Count - 1
                            Dim mes_ini = CDate(row(j)("FECHA_INI").ToString).Month().ToString
                            Dim mes_fin = CDate(row(j)("FECHA_FIN").ToString).Month().ToString
                            Dim mes_cese = "#"
                            Dim anio_cese = "#"
                            If row(j)("FECHA_CESE").ToString <> "" Then
                                mes_cese = CDate(row(j)("FECHA_CESE").ToString).Month().ToString
                                anio_cese = CDate(row(j)("FECHA_CESE").ToString).Year().ToString
                                If mes_cese.Length = 1 Then
                                    mes_cese = "0" + mes_cese
                                End If
                            End If
                           
                            
                            If mes_ini.Length = 1 Then
                                mes_ini = "0" + mes_ini
                            End If
                            If mes_fin.Length = 1 Then
                                mes_fin = "0" + mes_fin
                            End If
                            
                            
                            
                            
                            Dim peri_ini = CDate(row(j)("FECHA_INI").ToString).Year().ToString + mes_ini
                            Dim peri_fin = CDate(row(j)("FECHA_FIN").ToString).Year().ToString + mes_fin
                            Dim peri_cese = anio_cese + mes_cese
                            Dim peri_devengue = dt_Datos_Iniciales_AfpNet(i)("ANIO").ToString + dt_Datos_Iniciales_AfpNet(i)("MES").ToString
                            
                            If CInt(peri_devengue) >= CInt(peri_ini) And
                                 CInt(peri_devengue) <= CInt(peri_fin) Then
                                bool = True
                            End If
                            
                            If CInt(peri_devengue) = CInt(peri_ini) Then
                                bool2 = True
                            End If
                            
                            If peri_cese <> "##" Then
                                If CInt(peri_cese) = CInt(peri_devengue) Then
                                    bool3 = True
                                End If
                            End If
                           
                        Next
                        
                        If bool Then
                            ' resb.AppendFormat("<td >{0}</td>", "S")
                            res += "S" + ","
                        Else
                            ' resb.AppendFormat("<td >{0}</td>", "N")
                            res += "N" + ","
                        End If
                        
                        If bool2 Then
                            ' resb.AppendFormat("<td >{0}</td>", "S")
                            res += "S" + ","
                        Else
                            ' resb.AppendFormat("<td >{0}</td>", "N")
                            res += "N" + ","
                        End If
                        
                        If bool3 Then
                            ' resb.AppendFormat("<td >{0}</td>", "S")
                            res += "S" + ","
                        Else
                            ' resb.AppendFormat("<td >{0}</td>", "N")
                            res += "N" + ","
                        End If
                    Else
                        
                        
                    End If
                  
                    
                    End If
                    
                    
                    'PERIODO SIN REMUNERACION
                    If Not dt_peri_s_remu Is Nothing Then
                        Dim filtro3 = "PIDM='" + dt_Datos_Iniciales_AfpNet(i)("PIDM").ToString.Trim + "' AND ESTADO_IND='A'"
                        Dim row3() As DataRow = dt_peri_s_remu.Select(filtro3.Trim)
                    
                        If row3.Length > 0 Then
                            For k As Integer = 0 To row3.Count - 1
                                If fecha_ini >= CDate(row3(k)("FEC_INI").ToString) And
                                    fecha_fin <= CDate(row3(k)("FEC_FIN").ToString) And
                                    row3(k)("MOTIVO_CODIGO").ToString = "1" Then
                                    res += "L,"
                                ElseIf fecha_ini >= CDate(row3(k)("FEC_INI").ToString) And
                                    fecha_fin <= CDate(row3(k)("FEC_FIN").ToString) And
                                    row3(k)("MOTIVO_CODIGO").ToString = "2" Then
                                    res += "U,"
                                ElseIf fecha_ini >= CDate(row3(k)("FEC_INI").ToString) And
                                    fecha_fin <= CDate(row3(k)("FEC_FIN").ToString) And
                                    row3(k)("MOTIVO_CODIGO").ToString = "3" Then
                                    res += "O,"
                                   
                                Else
                                    res += "" + ","
                                End If
                                
                            Next
                            'res += row3(0)("RHPLANC_TOTAL_AFECTO").ToString + ","
                        Else
                          
                            res += "" + ","
                        End If
                    Else
                        res += "" + ","
                    
                    End If
                    
                    
                    
                
                If Not dt_cab_planilla Is Nothing Then
                    Dim filtro2 = "RHPLANC_PIDM='" + dt_Datos_Iniciales_AfpNet(i)("PIDM").ToString.Trim + "'"
                    Dim row2() As DataRow = dt_cab_planilla.Select(filtro2.Trim)
                    
                    If row2.Length > 0 Then
                        'resb.AppendFormat("<td >{0}</td>", row2(0)("RHPLANC_TOTAL_AFECTO").ToString)
                        res += row2(0)("RHPLANC_TOTAL_AFECTO").ToString + ","
                    Else
                        'resb.AppendFormat("<td >{0}</td>", "0")
                        res += "0" + ","
                    End If
                    
                End If
                
                'resb.AppendFormat("<td >{0}</td>", "0")
                'resb.AppendFormat("<td >{0}</td>", "0")
                'resb.AppendFormat("<td >{0}</td>", "0")
                'resb.AppendFormat("<td >{0}</td>", "N")
                'resb.AppendFormat("<td >{0}</td>", "")
                res += "0" + ","
                res += "0" + ","
                res += "0" + ","
                res += "N" + ","
                res += "" + ","
                res += "\r\n"
                
                ' resb.AppendFormat("</tr>")
            Next
            
        Else
            ' resb.AppendFormat("<tr></tr>")
       
        End If
        ' resb.AppendFormat("</table>")
      
        
        ' Dim res As String = ""
            ' res = resb.ToString()
        Catch ex As Exception
            res = "E"
        End Try
        
        Return res
    End Function

End Class