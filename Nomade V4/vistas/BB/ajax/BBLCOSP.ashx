<%@ WebHandler Language="VB" Class="BBLCOSP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class BBLCOSP : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim dtCombo As DataTable
    Dim Comision As New Nomade.BB.BBComisionSistemaPension("Bn")
    Dim Opcion, Codigo, Emp, cm As String
    Dim Periodo As New Nomade.NF.NFPeriodo("Bn")
    Dim bActual As Boolean = False
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        
        'context.Response.Write("Hello World")
        Opcion = context.Request("Opcion")
        Codigo = context.Request("Codigo")
        Emp = context.Request("Emp")
        cm = context.Request("cm")
        
        Dim p_FCOSIPE_CODE As String = context.Request("codigo")
        Dim p_FCOSIPE_COLUMNA As String = context.Request("c")
        Dim p_FCOSIPE_DATO As String = context.Request("d")
        Dim p_FCOSIPE_USUA_ID As String = context.Request("u")
        Dim p_FCOSIPE_FTVREPE_CODE As String = context.Request("cb")
        Dim p_SALIDA As String = ""
        Dim p_FCOSIPE_CTLG_CODE As String = Emp
        Dim p_FCOPERI_COD As String = context.Request("p")
        Dim IFiLajs As String = context.Request("f")
        Dim cFecha As String = context.Request("fe")
        Dim idCod As String = context.Request("id")
        Dim padres_codgigo As String = context.Request("padres")
        If p_FCOPERI_COD Is Nothing Then
            If Not cm Is Nothing Then
                p_FCOPERI_COD = cm.ToUpper()
            End If
           
        End If
        'opcion="0"
        Try
            Select Case Opcion
                Case "0"
                    
                    
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Periodo.Listar_Periodo("A", "", "N")
                    'dt = Comision.ListarCombo()
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            'resb.Append("""NOMBRE"" :" & """" & MiDataRow("ANO").ToString & "-" & MiDataRow("NUMERO_MES").ToString & """")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("MES").ToString & " " & MiDataRow("ANO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                    
                    
                Case "C"
                    'dt = Comision.ListarCombo()'MAURICIO
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVREPE_CODE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("FTVREPE_DESC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
                    Dim Plame As String = ""
                    dt = New DataTable
                    dt = Comision.ListarComuna(Emp, p_FCOPERI_COD.ToUpper(), "1")
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            Plame = Plame & dt.Rows(i)("FTCONFI_RHCNPL_CODE").ToString & ","
                        Next
                        Plame = Plame & "_"
                        Plame = Plame.Replace(",_", "")
                    End If
                    res = CrearComisionSistemaPension(p_FCOSIPE_USUA_ID, Plame, p_FCOSIPE_COLUMNA, p_FCOSIPE_DATO, p_FCOSIPE_FTVREPE_CODE, p_SALIDA, p_FCOSIPE_CTLG_CODE, p_FCOPERI_COD, padres_codgigo)
                Case "M"
                    res = ActualizarComisionSistemaPension(p_FCOSIPE_CODE, p_FCOSIPE_COLUMNA, p_FCOSIPE_DATO, p_FCOSIPE_USUA_ID, p_FCOSIPE_FTVREPE_CODE, p_SALIDA)
                Case "M"
                    
                Case "CBO"
                    res = ListarComboNuevo(IFiLajs, p_FCOSIPE_FTVREPE_CODE, p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE, idCod)
                    
                    
                    
                    
                    
                    
                Case "CONFIGURACION"
                    dt = Comision.ListarComuna(Emp, cm.ToUpper(), "1")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                           
                            resb.Append("{")
                            resb.Append("""COLUMNA"" :" & """" & MiDataRow("Columna").ToString & """,")
                            resb.Append("""AFP"" :" & """" & MiDataRow("AFP").ToString & """,")
                            resb.Append("""ONP"" :" & """" & MiDataRow("ONP").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                    
                    'Case "ONP"
                    '    dt = Comision.ListarComuna(Emp, cm)
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("[")
                    '        For Each MiDataRow As DataRow In dt.Rows
                    '            resb.Append("{")
                    '            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVREPE_CODE").ToString & """,")
                    '            resb.Append("""NOMBRE"" :" & """" & MiDataRow("FTVREPE_DESC").ToString & """,")
                    '            resb.Append("""TIPO"" :" & """" & MiDataRow("TFVREPRE_TIP").ToString & """")
                    '            resb.Append("}")
                    '            resb.Append(",")
                    '        Next
                    '        resb.Append("{}")
                    '        resb = resb.Replace(",{}", String.Empty)
                    '        resb.Append("]")
                    '    End If
                    '    res = resb.ToString()
                    
                    
                    
                          
                Case "P"
                    Dim PRM As String = ""
                    dt = Comision.ListarComuna(Emp, cm.ToUpper(), "1")
                    If Not (dt Is Nothing) Then
                        
                        For Each MiDataRow As DataRow In dt.Rows
                            PRM = PRM & MiDataRow("Codigo_Padre").ToString & ","
                        Next
                        PRM = PRM & "_"
                    End If
                    PRM = PRM.Replace(",_", "")
                    res = PRM
                    
                    
                Case "V"
                    dt = Comision.ListarValidacion(Emp)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVREPE_CODE").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("FTVREPE_DESC").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("TFVREPRE_TIP").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "X"
                    Dim lAFP() As String
                    Dim lONP() As String
                    Dim lTIPO() As String
                    
                    Dim cAFP As String = ""
                    Dim cONP As String = ""
                    Dim cTIPO As String = ""
                    
                    Dim cHtml As String = ""
                    Dim cNuevoListado As String = ""
                    dt = New DataTable
                    
                    
                    'dt = Periodo.Listar_Periodo("A", "", "N")
                    'If Not (dt Is Nothing) Then
                    '    cFecha = dt.Rows(0)("CODIGO").ToString()
                    'End If
                    Dim dia = Now()
                    cFecha = Devuelve_Nombre_Mes(dia.Month().ToString) + " " + dia.Year().ToString
                    
                   
                    If cFecha.Equals(cm.ToUpper()) Then
                        bActual = True
                    Else
                        bActual = False
                    End If
                    dt = Comision.ListarCombo(1, "", "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
            
                    Dim cboPension As String = ""
                    cboPension = "<select id='cboSistema0_0' style='width:190px;' onchange=' return ValidarCombo(""0"")'>"
                    If Not (dt Is Nothing) Then
                        cboPension = cboPension & "<option value='0'>" & "Seleccione..." & "</option>"
                        For Each MiDataRow As DataRow In dt.Rows
                            cboPension = cboPension & "<option value='" & MiDataRow("FTVREPE_CODE").ToString & "'>" & MiDataRow("FTVREPE_DESC").ToString & "</option>"
                        Next
                    End If
               
                    dt = Comision.ListarComuna(Emp, cm.ToUpper(), "1")
                    
                    Dim dtPadres As New DataTable
                    dtPadres = Comision.ListarComuna(Emp, cm.ToUpper(), "2")
                    
                    
                    Dim lstPadres As New List(Of OrdenPadres)
                    Dim var As New OrdenPadres
                    
                    
                    If Not (dt Is Nothing) Then
                        
                        Dim bEntrePadre As Boolean = False
                        
                        Dim Padre As String = ""
                        Dim iContador As Integer = 0
               
                        resb.Append("<table id='TablaComision'>")
                        resb.Append("<thead>")
                        resb.Append("<tr>")
                        
                        'TD VACIO PARA COMBO 
                        resb.Append("<td></td>")
                        
                        
                        If Not (dtPadres Is Nothing) Then
                            For i As Integer = 0 To dtPadres.Rows.Count - 1
                              
                              
                                
                                Dim Father = dtPadres(i)("Padre").ToString
                                Dim NumHijos = dtPadres(i)("HIJOS").ToString
                                resb.Append("<td style='border: 1px solid black;' colspan='" & NumHijos & "' align='center'>" + Father + "</td>")
                                var.secuencia = dtPadres(i)("Codigo_Padre").ToString
                                lstPadres.Add(var)
                            
                            Next
                        End If
                       
                        
                        'For i = 0 To dt.Rows.Count - 1
                            
                        '    cAFP = cAFP & dt(i)("AFP").ToString & ","
                        '    cONP = cONP & dt(i)("ONP").ToString & ","
                        '    cTIPO = cTIPO & dt(i)("TIPO").ToString & ","
                        '    resb.Append("<td style='border: 1px solid black;' colspan='" & iContador & "' align='center'>" + IIf(Padre = "VACÍO", "", Padre) + "</td>")
                            
                            
                        '    If dt(i)("Padre").ToString.Equals("") Then
                        '        resb.Append("<td>&nbsp;</td>")
                        '    Else
                        '        If Padre.Equals("") Then
                        '            Padre = dt(i)("Padre")
                        '            iContador += 1
                        '            If i < dt.Rows.Count - 1 Then
                        '                If Not Padre = dt(i + 1)("Padre") Then
                        '                    resb.Append("<td style='border: 1px solid black;' colspan='" & iContador & "' align='center'>" + IIf(Padre = "VACÍO", "", Padre) + "</td>")
                        '                    Padre = ""
                        '                    iContador = 0
                        '                Else
                                            
                        '                End If
                        '            End If
                        '        Else
                        '            If Padre = dt(i)("Padre") Then
                        '                iContador += 1
                        '                If i < dt.Rows.Count - 1 Then
                        '                    If Not Padre = dt(i + 1)("Padre") Then
                        '                        resb.Append("<td style='border: 1px solid black;' colspan='" & iContador & "' align='center'>" + IIf(Padre = "VACÍO", "", Padre) + "</td>")
                        '                        Padre = ""
                        '                        iContador = 0
                        '                    End If
                        '                Else
                        '                    resb.Append("<td style='border: 1px solid black;' colspan='" & iContador & "' align='center'>" + IIf(Padre = "VACÍO", "", Padre) + "</td>")
                        '                    Padre = ""
                        '                    iContador = 0
                        '                End If
                        '            End If
                        '        End If
                            
                        '    End If
                        'Next
                        'If Padre <> "" And iContador <> 0 Then
                        '    resb.Append("<td style='border: 1px solid black;' colspan='" & iContador & "' align='center'>" + IIf(Padre = "VACÍO", "", Padre) + "</td>")
                        'End If
                        
                        
                        'TD VACIO PARA LA ACCION DEL BOTON
                        resb.Append("<td align='center'></td>")

                        
                        
                       

                        
                        resb.Append("</tr>")
                        
                        
                        'F I L A      2    D E S C R I P C I O N E S
                        resb.Append("<tr>")
                        resb.Append("<td>" + "SISTEMA PENSIÓN" + "</td>")
                        Dim cCabecera As String = ""
                        
                        
                        For j As Integer = 0 To lstPadres.Count - 1
                            For i = 0 To dt.Rows.Count - 1
                                If lstPadres(j).secuencia.ToString = dt(i)("Codigo_Padre").ToString Then
                                    
                                    cAFP = cAFP & dt(i)("AFP").ToString & ","
                                    cONP = cONP & dt(i)("ONP").ToString & ","
                                    cTIPO = cTIPO & dt(i)("TIPO").ToString & ","
                                    
                                    resb.Append("<td>" + dt(i)("Descripcion") + "</td>")
                                    If cCabecera.Equals("") Then
                                        cCabecera = dt(i)("Descripcion").ToString()
                                    Else
                                        cCabecera = cCabecera & "," & dt(i)("Descripcion").ToString()
                                    End If
                                End If
                            Next
                            
                        Next
                        
                        
                       
                        resb.Append("<td>" + "ACC." + "</td>")
                        resb.Append("</tr>")
                         
                        'F I L A      2    D E S C R I P C I O N E S
                        
                        
                        
                        resb.Append("</thead>")
                        
                        lAFP = Split(cAFP, ",")
                        lONP = Split(cONP, ",")
                        lTIPO = Split(cTIPO, ",")
                        
                        
                        resb.Append("<tbody>")
                        
                       
                        Dim cNuevo As String = ""
                        Dim iFill As Integer = 0
                        If bActual = True Then
                            cNuevo = cNuevo & "<tr id='Ultima'>"
                            cNuevo = cNuevo & "<td align='center'>" & cboPension & "</td>"
                    
                            For i As Integer = 0 To dt.Rows.Count - 1
                     
                                cNuevo = cNuevo & "<td align='center'><input onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & "0_" & i + 1 & "' value='" & "" & "' style='width:" & IIf(lTIPO(i).Equals("1"), "55", "45") & "px;' />" & IIf(lTIPO(i).Equals("1"), "", "%") & "</td>"
                                iFill = iFill + 1
                            Next
                    
                            cNuevo = cNuevo & "<td align='center'><a class='btn blue cambiarbt' href='javascript:CrearSistemaPension(0);'><i class='icon-ok'></i></a></td>"
                            cNuevo = cNuevo & "</tr>"
                        End If
                   
                        Dim dtComisiones As New DataTable
                        dtComisiones = Comision.ListarComisionSistemaPension(String.Empty, Emp, cm.ToUpper())
                        If (dtComisiones Is Nothing) Then
                            resb.Append(cNuevo)
                            resb.Append("</tbody>")
                    
                            resb.Append("</table>")
                            resb.Append("<input id='hf' type='hidden' value='" & iFill & "' />")
                            resb.Append("<input id='hfC' type='hidden' value='" & cCabecera & "' />")
                        End If
                   
                        Dim iFila As Integer = 0
                        Dim bEntre As Boolean = False
                        Dim bEntreCombo As Boolean = False
                        Dim Colummna As Integer = 0
                        If Not (dtComisiones Is Nothing) Then
                        
             
                            For Each MiDataRow As DataRow In dtComisiones.Rows
                                Dim id As Integer = 0
                      
                        
                                If bActual = False Then
                            
                                    resb.Append("<td >" + ListarCombo(0 & "_" & id, MiDataRow("Cod"), True, dt.Rows.Count, p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE, MiDataRow("Codigo")) + "</td>")
                            
                                Else
                                    cNuevoListado = cNuevoListado & "<tr id='Ultima'>"
                                    If bEntreCombo = False Then
                                        cNuevoListado = cNuevoListado & "<td >" + ListarCombo(0 & "_" & id, MiDataRow("Cod"), False, dt.Rows.Count, p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE, MiDataRow("Codigo")) + "</td>"
                                        bEntreCombo = True
                                    Else
                                        resb.Append("<td >" + ListarCombo(Colummna + 1 & "_" & id, MiDataRow("Cod"), False, dt.Rows.Count, p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE, MiDataRow("Codigo")) + "</td>")
                                    End If
                                End If
                        
                       
                        
                        
                                Dim ArregloColumna() As String
                                Dim ArregloDato() As String
                                Dim Texto As String
                               
                            
                       
                                Texto = MiDataRow("Columna").ToString
                                ArregloColumna = Texto.Split(",")
                                Texto = MiDataRow("Dato").ToString
                                ArregloDato = Texto.Split(",")
                                iFila = ArregloColumna.Count()
                                For i = 0 To ArregloColumna.Count - 1
                                    If i = 0 And bEntre = False Then
                                     
                                        If bActual = False Then
                                    
                                        Else
                                            For x = 0 To ArregloDato.Count - 1
                                                cNuevoListado = cNuevoListado & "<td   align='center'><input onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & "0_" & x + 1 & "' value='" & "" & "' style='width:" & IIf(lTIPO(x).Equals("1"), "55", "45") & "px;' />" & IIf(lTIPO(x).Equals("1"), "", "%") & "</td>"
                                            Next
                                            cNuevoListado = cNuevoListado & "<td align='center'><a class='btn blue cambiarbt' href='javascript:CrearSistemaPension(0);'><i class='icon-ok'></i></a></td>"
                                            cNuevoListado = cNuevoListado & "</tr>"
                                            
                                            resb.Append("<tr>")
                                            resb.Append("<td >" + ListarCombo(Colummna + 1 & "_" & id, MiDataRow("Cod"), False, dt.Rows.Count, p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE, MiDataRow("Codigo")) + "</td>")
                                            
                                            
                                        End If
                                
                                      
                                        'If bActual = False Then
                                           
                                        'Else
                                           
                                        'End If
                                
                                    
                                
                                    End If
                                    bEntre = True
                                Next
                       
                        
                                For i = 0 To ArregloColumna.Count - 1
                                    If id <> ArregloColumna.Count Then
                                        id = id + 1
                                        If bActual = False Then
                                            Dim xTexto As String = ""
                                            xTexto = "<td  align='center'>" & IIf(ArregloDato(i).Equals(":"), "", ArregloDato(i)) & IIf(lTIPO(i).Equals("1"), "", "%") & "</td>"
                                            If xTexto.Equals("<td  align='center'>%</td>") Or xTexto.Equals("<td  align='center'></td>") Then
                                                xTexto = "<td  align='center'>-</td>"
                                            Else
                                                
                                            End If
                                            resb.Append(xTexto)
                                           
                                        Else
                                           
                                            
                                            
                                            If MiDataRow("Tipo").Equals("1") Then
                                                If lAFP(i).Equals("1") Then
                                                    resb.Append("<td  align='center'><input onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & Colummna + 1 & "_" & id & "' value='" & ArregloDato(i).ToString() & "' style='width:" & IIf(lTIPO(i).Equals("1"), "55", "45") & "px;' />" & IIf(lTIPO(i).Equals("1"), "", "%") & "</td>")
                                                Else
                                                    resb.Append("<td  align='center'><input disabled='disabled' onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & Colummna + 1 & "_" & id & "' value='" & "" & "' style='width:50px;' /></td>")
                                                End If
                                            End If
                                            
                                            If MiDataRow("Tipo").Equals("2") Then
                                                If lONP(i).Equals("1") Then
                                                    resb.Append("<td  align='center'><input onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & Colummna + 1 & "_" & id & "' value='" & ArregloDato(i).ToString() & "' style='width:" & IIf(lTIPO(i).Equals("1"), "55", "45") & "px;' />" & IIf(lTIPO(i).Equals("1"), "", "%") & "</td>")
                                                Else
                                                    resb.Append("<td  align='center'><input disabled='disabled' onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & Colummna + 1 & "_" & id & "' value='" & "" & "' style='width:50px;' /></td>")
                                                End If
                                            End If
                                            
                                        
                                            
                                        End If
                               
                                    Else
                                        resb.Append("<td  align='center'><input onkeypress=' return ValidaDecimales(event,this)' type='text' id='txtColummna" & Colummna + 1 & "_" & id & "' value='" & ArregloDato(i).ToString() & "' style='width:" & IIf(lTIPO(i).Equals("1"), "55", "45") & "px;' />" & IIf(lTIPO(i).Equals("1"), "", "%") & "</td>")
                                        id = 0
                                
                                    End If
                                    If i = ArregloColumna.Count - 1 Then
                                        Colummna = Colummna + 1
                                    End If
                                
                            
                                Next
                                If bActual = False Then
                                    resb.Append("<td  align='center'></td>")
                            
                                Else
                                    resb.Append("<td  align='center'><a class='btn green cambiarbt' href='javascript:Modificar(" & Colummna & ",""" & MiDataRow("Codigo").ToString & """);'><i class='icon-refresh'></i></a></td>")
                                End If
                       
                                resb.Append("</tr>")
                            Next
                            resb.Append(cNuevoListado & cHtml)
                            
                            resb.Append("</tbody>")
                    
                            resb.Append("</table>")
                            resb.Append("<input id='hf' type='hidden' value='" & iFila & "' />")
                            resb.Append("<input id='hfC' type='hidden' value='" & cCabecera & "' />")
                        End If
                    Else
                        resb.Append("<b>Debe registrar la conguración del periodo...!</b>")
                    End If
                   
                    res = resb.ToString()
            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)
        End Try
    End Sub
    Dim idSelect As Integer = 0
    Dim iCarge As Integer = 0
    'Dim iEntre As Integer = 0
    Private Function ListarCombo(ByVal idSelect As String, ByVal cCodigo As String, ByVal btexto As Boolean, ByVal iCount As Integer, ByVal p_FCOPERI_COD As String, ByVal p_FCOSIPE_CTLG_CODE As String, ByVal id As String) As String
        'idSelect = idSelect + 1
        Dim cResultado As String = ""
        If iCarge = 0 Then
            If bActual = True Then
                dtCombo = Comision.ListarCombo(0, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
            Else
                dtCombo = Comision.ListarCombo(1, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
            End If
            
            'dtCombo = Comision.ListarCombo(0, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
            iCarge = iCarge + 1
        Else
            dtCombo = Comision.ListarCombo(1, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
        End If
        
        'cResultado = "<td>"
        
        If btexto = True Then
            For i = 0 To dtCombo.Rows.Count - 1
                If dtCombo(i)("FTVREPE_CODE").ToString.Equals(cCodigo) Then
                    cResultado = dtCombo(i)("FTVREPE_DESC").ToString
                End If
            Next
          
            
        Else
         
            'MsgBox(idSelect)
            Dim cFilaComobo As String = ""
            
            If idSelect.Length = 3 Then
                cFilaComobo = idSelect.Substring(0, 1)
            End If
            
            If idSelect.Length = 4 Then
                cFilaComobo = idSelect.Substring(0, 2)
            End If
            
            If iCarga = 0 Then
                cResultado = cResultado & "<select style='width:190px;' id='cboSistema" + idSelect + "' onchange=' return ValidarCombo(""" & cFilaComobo & """,""" & "0000" & """) '>"
            Else
                cResultado = cResultado & "<select style='width:190px;' id='cboSistema" + idSelect + "' onchange=' return ValidarCombo(""" & cFilaComobo & """,""" & cCodigo & """) '>"
                
            End If
            'cResultado = cResultado & "<select style='width:190px;' id='cboSistema" + idSelect + "' onchange=' return ValidarCombo(" & cFilaComobo & "," & cCodigo & ") '>"
            'If iEntre = 0 Then
            If iCarga = 0 Then
                cResultado = cResultado & "<option selected value='0'>" & "Seleccione..." & "</option>"
                iCarga = iCarga + 1
            Else
            
            End If
             
            'End If
            'cResultado = cResultado & "<option value='0'>" + "Seleccione..." + "</option>"
            If Not dtCombo Is Nothing Then
                
                For i = 0 To dtCombo.Rows.Count - 1
                    If dtCombo(i)("FTVREPE_CODE").ToString.Equals(cCodigo) Then
                        'If iEntre = 0 Then
                        '    cResultado = cResultado & "<option value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
                     
                        'Else
                        cResultado = cResultado & "<option selected value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
                        'End If
                   
                    Else
                        cResultado = cResultado & "<option value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
                    End If
                Next
            End If
           
            cResultado = cResultado & "</select>"
            'iEntre = iEntre + 1
        End If
        
      
        'cResultado = cResultado & "</td >""x
        
        'If Not (dt Is Nothing) Then
        '    resb.Append("[")
        '    For Each MiDataRow As DataRow In dt.Rows
        '        resb.Append("{")
        '        resb.Append("""CODIGO"" :" & """" & MiDataRow("FTVREPE_CODE").ToString & """,")
        '        resb.Append("""NOMBRE"" :" & """" & MiDataRow("FTVREPE_DESC").ToString & """")
        '        resb.Append("}")
        '        resb.Append(",")
        '    Next
        '    resb.Append("{}")
        '    resb = resb.Replace(",{}", String.Empty)
        '    resb.Append("]")
        'End If
        
        Return cResultado
    End Function
    Dim iCarga As Integer = 0
    Private Function ListarComboNuevo(ByVal iFila As Integer, ByVal cSelected As String, ByVal p_FCOPERI_COD As String, ByVal p_FCOSIPE_CTLG_CODE As String, ByVal id As String) As String
        Dim cResultado As String = ""
        id = id.Replace("'", "")
        If id.Equals("0") Then
            dtCombo = Comision.ListarCombo(0, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
        Else
            dtCombo = Comision.ListarCombo(1, id, "A", p_FCOPERI_COD, p_FCOSIPE_CTLG_CODE)
        End If
       
        'cResultado = "<td>"
      
        cResultado = cResultado & "<select style='width:190px;' id='cboSistema" & (iFila - 1) & "_" & 0 & " onchange=' return ValidarCombo(""0"")'>"
        cResultado = cResultado & "<option selected value='0'>" & "Seleccione..." & "</option>"
        
        
        
        If Not dtCombo Is Nothing Then
            For i = 0 To dtCombo.Rows.Count - 1
                'cResultado = cResultado & "<option value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
            
                If dtCombo(i)("FTVREPE_CODE").ToString.Equals(cSelected) Then
                    cResultado = cResultado & "<option selected value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
                Else
                    cResultado = cResultado & "<option value='" & dtCombo(i)("FTVREPE_CODE").ToString & "'>" + dtCombo(i)("FTVREPE_DESC").ToString + "</option>"
                End If
            Next
        End If
       
        cResultado = cResultado & "</select>"
        Return cResultado
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
    
    Public Function ActualizarComisionSistemaPension(ByVal p_FCOSIPE_CODE As String, ByVal p_FCOSIPE_COLUMNA As String,
                                               ByVal p_FCOSIPE_DATO As String, ByVal p_FCOSIPE_USUA_ID As String,
                                               ByVal p_FCOSIPE_FTVREPE_CODE As String, ByVal p_SALIDA As String) As String
        Dim datos(1)
        datos(0) = Comision.ActualizarComisionSistemaPension(p_FCOSIPE_CODE, p_FCOSIPE_COLUMNA,
                                                 p_FCOSIPE_DATO, p_FCOSIPE_USUA_ID,
                                                 p_FCOSIPE_FTVREPE_CODE, p_SALIDA)
        Comision = Nothing
        Return datos(0)
        
    End Function
      
    Public Function CrearComisionSistemaPension(
                                               ByVal p_FCOSIPE_USUA_ID As String, ByVal p_FTCONFI_RHCNPL_CODE As String, ByVal p_FCOSIPE_COLUMNA As String, ByVal p_FCOSIPE_DATO As String,
                                                ByVal p_FCOSIPE_FTVREPE_CODE As String, ByVal p_FCOSIPE_CTLG_CODE As String, ByVal p_SALIDA As String, ByVal p_FCOPERI_CODE As String, ByVal FCOSIPE_GRUP As String) As String
        Dim datos(1) As String
        datos(0) = Comision.CrearComisionSistemaPension(p_FCOSIPE_USUA_ID, p_FTCONFI_RHCNPL_CODE, p_FCOSIPE_COLUMNA, p_FCOSIPE_DATO, p_FCOSIPE_FTVREPE_CODE, p_SALIDA, p_FCOSIPE_CTLG_CODE, p_FCOPERI_CODE.ToUpper(), FCOSIPE_GRUP)
        Comision = Nothing
        Return datos(0)
        
    End Function
    
    Public Structure OrdenPadres
        Dim secuencia As String
    End Structure
    
    Public Function Devuelve_Nombre_Mes(omes As String) As String
        
        Dim cMes As String = ""
        
        If omes = "1" Then
            cMes = "ENERO"
        ElseIf omes = "2" Then
            cMes = "FEBRERO"
        ElseIf omes = "3" Then
            cMes = "MARZO"
        ElseIf omes = "4" Then
            cMes = "ABRIL"
        ElseIf omes = "5" Then
            cMes = "MAYO"
        ElseIf omes = "6" Then
            cMes = "JUNIO"
        ElseIf omes = "7" Then
            cMes = "JULIO"
        ElseIf omes = "8" Then
            cMes = "AGOSTO"
        ElseIf omes = "9" Then
            cMes = "SEPTIEMBRE"
        ElseIf omes = "10" Then
            cMes = "OCTUBRE"
        ElseIf omes = "11" Then
            cMes = "NOVIEMBRE"
        ElseIf omes = "12" Then
            cMes = "DICIEMBRE"
        End If
        
        Return cMes
    End Function
    

End Class