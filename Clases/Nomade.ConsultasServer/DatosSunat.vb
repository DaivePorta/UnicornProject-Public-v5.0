Imports Microsoft.VisualBasic
Imports System.Runtime.InteropServices
Imports System.Text
Imports System.Threading.Timeout

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class DatosSunat



    Private Declare Function GetPixel Lib "gdi32" (ByVal HDC As Long, ByVal x As Long, ByVal y As Long) As Long
    Private Declare Function SetPixelV Lib "gdi32" (ByVal HDC As Long, ByVal x As Long, ByVal y As Long, ByVal crColor As Long) As Long

    Dim Rred
    Dim Ggreen
    Dim Bblue
    Dim Pixel

    Dim xDat As String
    Dim xRazSoc As String, xEst As String, xCon As String, xDir As String
    Dim xRazSocX As Long, xEstX As Long, xConX As Long, xDirX As Long
    Dim xRazSocY As Long, xEstY As Long, xConY As Long, xDirY As Long
    Dim xTel As String
    Dim xAct As String
    Dim xTCo As String
    Dim xNomCom As String
    Dim xFeIn As String
    Dim xFeBa As String

    ' Private Declare Function WaitForSingleObject Lib "kernel32" (ByVal hHandle As Long, ByVal dwMilliseconds As Long) As Long

    <DllImport("kernel32.dll", SetLastError:=True)>
    Public Shared Function WaitForSingleObject(ByVal handle As IntPtr, ByVal milliseconds As UInt32) As Int32
    End Function


    <DllImport("kernel32.dll")>
    Public Shared Function OpenProcess(processAccess As Integer, bInheritHandle As Boolean, processId As Integer) As IntPtr
    End Function


    <DllImport("kernel32.dll", SetLastError:=True)>
    Public Shared Function CloseHandle(ByVal hObject As IntPtr) As <MarshalAs(UnmanagedType.Bool)> Boolean
    End Function

    Const INFINITE As UInt32 = &HFFFFFFFFUI

    Const WAIT_ABANDONED As UInt32 = &H80UI
    Const WAIT_OBJECT_0 As UInt32 = &H0UI
    Const WAIT_TIMEOUT As UInt32 = &H102UI
    Const SYNCHRONIZE = &H100000

    Public Enum ProcessAccess As Integer
        ''' <summary>Specifies all possible access flags for the process object.</summary>
        AllAccess = CreateThread Or DuplicateHandle Or QueryInformation Or SetInformation Or Terminate Or VMOperation Or VMRead Or VMWrite Or Synchronize
        ''' <summary>Enables usage of the process handle in the CreateRemoteThread function to create a thread in the process.</summary>
        CreateThread = &H2
        ''' <summary>Enables usage of the process handle as either the source or target process in the DuplicateHandle function to duplicate a handle.</summary>
        DuplicateHandle = &H40
        ''' <summary>Enables usage of the process handle in the GetExitCodeProcess and GetPriorityClass functions to read information from the process object.</summary>
        QueryInformation = &H400
        ''' <summary>Enables usage of the process handle in the SetPriorityClass function to set the priority class of the process.</summary>
        SetInformation = &H200
        ''' <summary>Enables usage of the process handle in the TerminateProcess function to terminate the process.</summary>
        Terminate = &H1
        ''' <summary>Enables usage of the process handle in the VirtualProtectEx and WriteProcessMemory functions to modify the virtual memory of the process.</summary>
        VMOperation = &H8
        ''' <summary>Enables usage of the process handle in the ReadProcessMemory function to' read from the virtual memory of the process.</summary>
        VMRead = &H10
        ''' <summary>Enables usage of the process handle in the WriteProcessMemory function to write to the virtual memory of the process.</summary>
        VMWrite = &H20
        ''' <summary>Enables usage of the process handle in any of the wait functions to wait for the process to terminate.</summary>
        Synchronize = &H100000
    End Enum


    'Const WAIT_INFINITE = -1&


    Declare Unicode Function GetShortPathName Lib "kernel32.dll" Alias "GetShortPathNameW" (ByVal longPath As String, <MarshalAs(UnmanagedType.LPTStr)> ByVal ShortPath As System.Text.StringBuilder, <MarshalAs(UnmanagedType.U4)> ByVal bufferSize As Integer) As Integer



    <DllImport("urlmon.dll", CharSet:=CharSet.Auto, SetLastError:=True)>
    Private Shared Function URLDownloadToFile(
                                                 <MarshalAs(UnmanagedType.IUnknown)> pCaller As Object,
                                                 <MarshalAs(UnmanagedType.LPWStr)> szURL As String,
                                                 <MarshalAs(UnmanagedType.LPWStr)> szFileName As String,
                                                 dwReserved As Int32, lpfnCB As IntPtr) As Int32
    End Function





    Public Function ShellAndWait(ByVal sPath As String, ByVal winStyle As AppWinStyle, Optional sTiempo As Long = 0) As Boolean

        Dim procID As Long
        Dim procHandle As Long

        Try
            procID = Microsoft.VisualBasic.Shell(sPath, 0)

            procHandle = OpenProcess(SYNCHRONIZE, 0, procID)
            If procHandle <> 0 Then

                WaitForSingleObject(procHandle, IIf(sTiempo = 0, INFINITE, sTiempo))

                CloseHandle(procHandle)
            End If


            ShellAndWait = True
            Exit Function
        Catch ex As Exception

            ShellAndWait = False
        End Try

    End Function


    Public Function GetShortDir(Nombre As String) As String
        Dim buffer As New StringBuilder
        Call GetShortPathName(Nombre, buffer, 255)
        GetShortDir = Replace(buffer.ToString, Chr(0), vbNullString)
        '    End If
    End Function

    Function GetDirTemp(ByVal rutaLib As String) As String
        Dim ruta As String = ""

        If Environ$("temp") <> vbNullString Then
            ruta = Environ$("temp")
        End If

        Return ruta
    End Function


    Sub Descargar(ByVal URL As String, ByVal rutaDescarga As String)
        On Error GoTo Cualquiera
        Dim rf As String = ""
        rf = URL.Substring(28)
        ' Dim ruta_local = GetDirTemp(rutaLib)
        'Call URLDownloadToFile(0, URL, rutaDescarga & "\sunat.tmp", 0, 0)
        Call URLDownloadToFile(0, URL, rutaDescarga & rf & ".tmp", 0, 0)
        Exit Sub
Cualquiera:

        MsgBox("No responde el servicio de la SUNAT", vbCritical, "Error")
    End Sub



    Private Sub GetRGB(ByVal Col As String)
        On Error Resume Next
        Bblue = Col \ (256 ^ 2)
        Ggreen = (Col - Bblue * 256 ^ 2) \ 256
        Rred = (Col - Bblue * 256 ^ 2 - Ggreen * 256)
    End Sub


    Function DescargaCaptcha(ByVal rutaDescarga As String) As String
        On Error Resume Next
        Call Descargar("http://www.sunat.gob.pe/cl-ti-itmrconsruc/captcha?accion=image", rutaDescarga)

        Return GetDirTemp(rutaDescarga) & "\sunat.tmp"
    End Function

    Function ConvertirImagenTexto(ByVal rutaLib As String, ByVal rutaDescarga As String) As String
        On Error Resume Next
        Dim ShellPath As String
        Dim Texto As String = ""
        Dim x As Integer, y As Integer
        Dim location = System.Reflection.Assembly.GetExecutingAssembly().Location


        Dim tempPath As String = "" 'path ../../ para src
        tempPath = rutaLib


        ShellPath = GetShortDir(tempPath) & "\modulo.dll " & GetShortDir(rutaDescarga) & "\sunat.tmp " & GetShortDir(rutaDescarga) & "\output" & " -psm"

        If ShellAndWait(ShellPath, vbMinimizedNoFocus) = True Then  ' Esperando a que el OCR Convierta el Texto

            If (File.Exists(GetShortDir(rutaDescarga) & "\output.txt")) Then
                FileOpen(1, GetShortDir(rutaDescarga) & "\output.txt", OpenMode.Input) 'Mostrando el texto Convertido
                While Not EOF(1)
                    Texto = LineInput(1)
                    If Texto <> "" Then
                        Exit While
                    End If
                End While
                FileClose(1)

                Kill(GetShortDir(rutaDescarga) & "\output.txt")   'Borrando el texto generado
                ConvertirImagenTexto = Texto
            Else
                ConvertirImagenTexto = "ARCHIVO NO GENERADO"
            End If
        Else

            ConvertirImagenTexto = "error"
        End If

        Return Texto

    End Function

    Function OpenTxt(ByVal rutaLib As String, ByVal documentoOrigen As String) As String
        On Error Resume Next

        Dim DocOrigen = documentoOrigen
        'Open "d:\sunat.txt" For Input As #1
        'FileOpen(1, GetShortDir(rutaLib) & "\sunat.tmp", OpenMode.Input)
        FileOpen(1, GetShortDir(rutaLib) & DocOrigen & ".tmp", OpenMode.Input)

        Dim Linea As String, Total As String = ""
        Do Until EOF(1)
            Linea = LineInput(1)
            Total = Total + Linea + vbCrLf
        Loop
        FileClose(1)
        OpenTxt = Total

        'Aquí elimina el txt que se genera 
        If Len(Dir(GetShortDir(rutaLib) & DocOrigen & ".tmp")) Then
            Kill(GetShortDir(rutaLib) & DocOrigen & ".tmp")
        End If

    End Function


    Function OTROsunat(ByVal xNum As String, ByVal rutaDescarga As String) As String
        'On Error Resume Next
        On Error GoTo EsteErr
        Dim tmpVal As String
        Dim xTabla() As String
        Dim PosisionScript As Integer, PosisionScript1 As Integer
        Dim datos As String = ""
        Dim numero As String = ""

        numero = xNum.Substring(0, 2)

        xDat = OpenTxt(rutaDescarga, xNum)

        'DPORTA_RF
        xDat = Replace(xDat, vbCrLf, "")
        xDat = Replace(xDat, "     ", " ")
        xDat = Replace(xDat, "    ", " ")
        xDat = Replace(xDat, "   ", " ")
        xDat = Replace(xDat, "  ", " ")

        xDat = Replace(xDat, ",", "{")
        xDat = Replace(xDat, ":", "}{")

        xTabla = Split(xDat, "{ ")


        If xTabla.Length <= 1 Then

            'ERROR DE CAPTCHA

            Return "ERROR_CAPTCHA"


        ElseIf xTabla.Length <= 149 Then
            'DPORTA_RF
            If numero = "20" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(22) = "-" 'xTel
                xTabla(32) = Replace(xTabla(32), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(32)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            ElseIf numero = "10" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(22) = "-" 'xTel
                xTabla(34) = Replace(xTabla(34), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(34)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            ElseIf numero = "15" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(22) = "-" 'xTel
                xTabla(32) = Replace(xTabla(32), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(32)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            End If

            'Select Case xTabla.Length
            '    'DPORTA_RF
            '        Case 149
            '            xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
            '            xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
            '            xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
            '            xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
            '            xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
            '            xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
            '            xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
            '            xTabla(22) = "-" 'xTel
            '            xTabla(26) = "" ' Replace(xTabla(26), Chr(34), "") 'xAct


            '            xRazSoc = (xTabla(4)).Trim()
            '            xFeIn = (xTabla(8)).Trim()
            '            xCon = (xTabla(10)).Trim()
            '            xTCo = (xTabla(12)).Trim()
            '            xEst = (xTabla(14)).Trim()
            '            xNomCom = (xTabla(16)).Trim()
            '            xDir = (xTabla(20)).Trim()
            '            xTel = (xTabla(22)).Trim()
            '            xAct = (xTabla(26)).Trim()


            '    End Select

            '    datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            'Else

            '    If xNum.StartsWith("1") Then

            '    Select Case xTabla.Length

            '        Case 35
            '            xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '            xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '            xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '            xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '            xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '            xTabla(18) = Replace(xTabla(18), "class='bg' colspan=1>", "")
            '            xTabla(20) = Replace(Mid(xTabla(20), 1, InStr(xTabla(20), "<!--") - 1), "class='bg' colspan=3>", "")
            '            xTabla(22) = Replace(Mid(xTabla(22), 1, InStr(xTabla(22), "--><!--") - 1), "class='bg' colspan=1>", "")
            '            xTabla(32) = Replace(Mid(xTabla(32), 1, InStr(xTabla(32), "<br>") - 1), "class='bg' colspan=3>", "")
            '            xTabla(32) = Replace(xTabla(32).Trim(), "Principal - ", "")

            '            xRazSoc = (xTabla(3)).Trim()
            '            xEst = (xTabla(15)).Trim()
            '            xCon = (xTabla(18)).Trim()
            '            xDir = (xTabla(20)).Trim()
            '            xTel = (xTabla(22)).Trim()
            '            xAct = (xTabla(32)).Trim()
            '            xTCo = (xTabla(5)).Trim()
            '            xNomCom = (xTabla(9)).Trim()
            '            xFeIn = (xTabla(13)).Trim()

            '        Case 37
            '            If xTabla(11).Trim() = "class='bg' colspan=1>SI" Then 'nuevo rus
            '                xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '                xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '                xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '                xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '                xTabla(20) = Replace(xTabla(20), "class='bg' colspan=1>", "")
            '                xTabla(17) = Replace(xTabla(17), "class='bg' colspan=1>", "")
            '                xTabla(22) = Replace(Mid(xTabla(22), 1, InStr(xTabla(22), "<!--") - 1), "class='bg' colspan=3>", "")
            '                xTabla(24) = Replace(Mid(xTabla(24), 1, InStr(xTabla(24), "--><!--") - 1), "class='bg' colspan=1>", "")
            '                xTabla(34) = Replace(Mid(xTabla(34), 1, InStr(xTabla(34), "<br>") - 1), "class='bg' colspan=3>", "")
            '                xTabla(34) = Replace(xTabla(34).Trim(), "Principal - ", "")

            '                xRazSoc = (xTabla(3)).Trim()
            '                xEst = (xTabla(17)).Trim()
            '                xCon = (xTabla(20)).Trim()
            '                xDir = (xTabla(22)).Trim()
            '                xTel = (xTabla(24)).Trim()
            '                xAct = (xTabla(34)).Trim()
            '                xTCo = (xTabla(5)).Trim()
            '                xNomCom = (xTabla(9)).Trim()
            '                xFeIn = (xTabla(15)).Trim()
            '            Else
            '                xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '                xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '                xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '                xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '                xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '                xTabla(18) = Replace(xTabla(18), "class='bg' colspan=1>", "")
            '                xTabla(22) = Replace(Mid(xTabla(22), 1, InStr(xTabla(22), "<!--") - 1), "class='bg' colspan=3>", "")
            '                xTabla(24) = Replace(Mid(xTabla(24), 1, InStr(xTabla(24), "--><!--") - 1), "class='bg' colspan=1>", "")
            '                xTabla(34) = Replace(Mid(xTabla(34), 1, InStr(xTabla(34), "<br>") - 1), "class='bg' colspan=3>", "")
            '                xTabla(34) = Replace(xTabla(34).Trim(), "Principal - ", "")

            '                xRazSoc = (xTabla(3)).Trim()
            '                xEst = (xTabla(15)).Trim()
            '                xCon = (xTabla(18)).Trim()
            '                xDir = (xTabla(22)).Trim()
            '                xTel = (xTabla(24)).Trim()
            '                xAct = (xTabla(34)).Trim()
            '                xTCo = (xTabla(5)).Trim()
            '                xNomCom = (xTabla(9)).Trim()
            '                xFeIn = (xTabla(13)).Trim()
            '            End If


            '        Case 38   'baja
            '            xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '            xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '            xTabla(17) = Replace(xTabla(17), "class='bg' colspan=1>", "")

            '            xRazSoc = (xTabla(3)).Trim()
            '            xEst = (xTabla(15)).Trim()
            '            xFeBa = (xTabla(17)).Trim()

            '            Return "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""FECHA_BAJA"":""" & xFeBa & """}]"

            '        Case 39
            '            xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '            xTabla(17) = Replace(xTabla(17), "class='bg' colspan=1>", "")
            '            xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '            xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '            xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '            xTabla(20) = Replace(xTabla(20), "class='bg' colspan=3>", "")
            '            xTabla(22) = Replace(Mid(xTabla(22), 1, InStr(xTabla(22), "<!--") - 1), "class='bg' colspan=3>", "")
            '            xTabla(24) = Replace(Mid(xTabla(24), 1, InStr(xTabla(24), "--><!--") - 1), "class='bg' colspan=1>", "")
            '            xTabla(36) = Replace(Mid(xTabla(36), 1, InStr(xTabla(36), "<br>") - 1), "class='bg' colspan=3>", "")
            '            xTabla(36) = Replace(xTabla(36).Trim(), "Principal - ", "")

            '            xRazSoc = (xTabla(3)).Trim()
            '            xEst = (xTabla(17)).Trim()
            '            xCon = (xTabla(20)).Trim()
            '            xDir = (xTabla(22)).Trim()
            '            xTel = (xTabla(24)).Trim()
            '            xAct = (xTabla(36)).Trim()
            '            xTCo = (xTabla(5)).Trim()
            '            xNomCom = (xTabla(9)).Trim()
            '            xFeIn = (xTabla(13)).Trim()

            '        Case 33

            '            If xNum.Substring(0, 2).Equals("15") Then
            '                xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '                xTabla(17) = Replace(xTabla(17), "class='bg' colspan=1>", "")
            '                xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '                xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '                xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '                xTabla(20) = Replace(xTabla(20), "class='bg' colspan=1>", "")
            '                xTabla(22) = Replace(xTabla(22), "class='bg' colspan=3>", "")
            '                xTabla(30) = Replace(xTabla(30).Trim(), "Principal - ", "")
            '                xTabla(30) = Replace(xTabla(30), "class='bg' colspan=3>", "")
            '                xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<!--") - 1), "class='bg' colspan=3>", "")
            '                xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<br>") - 1), "class='bg' colspan=3>", "")

            '                xRazSoc = (xTabla(3)).Trim()
            '                xEst = (xTabla(17)).Trim()
            '                xCon = (xTabla(20)).Trim()
            '                xDir = (xTabla(22)).Trim()
            '                xTel = "-"
            '                xAct = (xTabla(30)).Trim()
            '                xTCo = (xTabla(5)).Trim()
            '                xNomCom = (xTabla(9)).Trim()
            '                xFeIn = (xTabla(15)).Trim()
            '            Else
            '                xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '                xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '                xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '                xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '                xTabla(11) = Replace(xTabla(11), "class='bg' colspan=1>", "")
            '                xTabla(18) = Replace(xTabla(18), "class='bg' colspan=1>", "")
            '                xTabla(22) = Replace(xTabla(22), "class='bg' colspan=3>", "")
            '                'xTabla(22) = Replace(Mid(xTabla(22), 1, InStr(xTabla(22), "<!--") - 1), "class='bg' colspan=3>", "")
            '                'xTabla(20) = Replace(Mid(xTabla(20), 1, InStr(xTabla(20), "--><!--") - 1), "class='bg' colspan=1>", "")
            '                'xTabla(20) = Replace(Mid(xTabla(20), 1, InStr(xTabla(20), "<br>") - 1), "class='bg' colspan=3>", "")
            '                'xTabla(20) = Replace(xTabla(20), "class='bg' colspan=1>", "")
            '                xTabla(30) = Replace(xTabla(30).Trim(), "Principal - ", "")
            '                xTabla(30) = Replace(xTabla(30), "class='bg' colspan=3>", "")
            '                xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<!--") - 1), "class='bg' colspan=3>", "")
            '                xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<br>") - 1), "class='bg' colspan=3>", "")

            '                xRazSoc = (xTabla(3)).Trim()
            '                xEst = (xTabla(15)).Trim()
            '                xCon = (xTabla(18)).Trim()
            '                xDir = (xTabla(22)).Trim()
            '                xTel = "-"
            '                xAct = (xTabla(30)).Trim()
            '                xTCo = (xTabla(5)).Trim()
            '                xNomCom = (xTabla(9)).Trim()
            '                xFeIn = (xTabla(11)).Trim()
            '            End If


            '        Case 32
            '            xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '            xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '            xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '            xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '            xTabla(11) = Replace(xTabla(11), "class='bg' colspan=1>", "")
            '            xTabla(19) = Replace(xTabla(19), "class='bg' colspan=1>", "")
            '            xTabla(21) = Replace(xTabla(21), "class='bg' colspan=3>", "")
            '            xTabla(29) = Replace(xTabla(29).Trim(), "Principal - ", "")
            '            xTabla(29) = Replace(xTabla(29), "class='bg' colspan=3>", "")
            '            xTabla(29) = Replace(Mid(xTabla(29), 1, InStr(xTabla(29), "<!--") - 1), "class='bg' colspan=3>", "")
            '            xTabla(29) = Replace(Mid(xTabla(29), 1, InStr(xTabla(29), "<br>") - 1), "class='bg' colspan=3>", "")

            '            xRazSoc = (xTabla(3)).Trim()
            '            xEst = (xTabla(15)).Trim()
            '            xCon = (xTabla(19)).Trim()
            '            xDir = (xTabla(21)).Trim()
            '            xTel = "-"
            '            xAct = (xTabla(29)).Trim()
            '            xTCo = (xTabla(5)).Trim()
            '            xNomCom = (xTabla(9)).Trim()
            '            xFeIn = (xTabla(11)).Trim()

            '        Case 31 'Otros Rucs que empiezan con 15
            '            xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '            xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '            xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '            xTabla(9) = Replace(xTabla(9), "class='bg' colspan=1>", "")
            '            xTabla(11) = Replace(xTabla(11), "class='bg' colspan=1>", "")
            '            xTabla(18) = Replace(xTabla(18), "class='bg' colspan=1>", "")
            '            xTabla(20) = Replace(xTabla(20), "class='bg' colspan=3>", "")
            '            xTabla(28) = Replace(xTabla(28).Trim(), "Principal - ", "")
            '            xTabla(28) = Replace(xTabla(28), "class='bg' colspan=3>", "")
            '            xTabla(28) = Replace(Mid(xTabla(28), 1, InStr(xTabla(28), "<!--") - 1), "class='bg' colspan=3>", "")
            '            xTabla(28) = Replace(Mid(xTabla(28), 1, InStr(xTabla(28), "<br>") - 1), "class='bg' colspan=3>", "")

            '            xRazSoc = (xTabla(3)).Trim()
            '            xEst = (xTabla(15)).Trim()
            '            xCon = (xTabla(18)).Trim()
            '            xDir = (xTabla(20)).Trim()
            '            xTel = "-"
            '            xAct = (xTabla(28)).Trim()
            '            xTCo = (xTabla(5)).Trim()
            '            xNomCom = (xTabla(9)).Trim()
            '            xFeIn = (xTabla(11)).Trim()

            '    End Select


            'Else

            '    If xTabla.Length = 33 Then
            '        xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '        xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '        xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '        xTabla(7) = Replace(xTabla(7), "class='bg' colspan=1>", "")
            '        xTabla(11) = Replace(xTabla(11), "class='bg' colspan=1>", "")
            '        xTabla(16) = Replace(xTabla(16), "class='bg' colspan=1>", "")
            '        xTabla(18) = Replace(Mid(xTabla(18), 1, InStr(xTabla(18), "<!--") - 1), "class='bg' colspan=3>", "")
            '        xTabla(20) = Replace(Mid(xTabla(20), 1, InStr(xTabla(20), "--><!--") - 1), "class='bg' colspan=1>", "")
            '        xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<br>") - 1), "class='bg' colspan=3>", "")
            '        xTabla(30) = Replace(xTabla(30).Trim(), "Principal - ", "")

            '        xRazSoc = (xTabla(3)).Trim()
            '        xEst = (xTabla(13)).Trim()
            '        xCon = (xTabla(16)).Trim()
            '        xDir = (xTabla(18)).Trim()
            '        xTel = (xTabla(20)).Trim()
            '        xAct = (xTabla(30)).Trim()
            '        xTCo = (xTabla(5)).Trim()
            '        xNomCom = (xTabla(7)).Trim()
            '        xFeIn = (xTabla(11)).Trim()

            '    ElseIf xTabla.Length = 30 Then
            '        xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '        xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '        xTabla(5) = Replace(xTabla(5), "class='bg' colspan=3>", "")
            '        xTabla(7) = Replace(xTabla(7), "class='bg' colspan=1>", "")
            '        xTabla(11) = Replace(xTabla(11), "class='bg' colspan=1>", "")
            '        xTabla(16) = Replace(xTabla(16), "class='bg' colspan=1>", "")
            '        xTabla(18) = Replace(Mid(xTabla(18), 1, InStr(xTabla(18), "<!--") - 1), "class='bg' colspan=3>", "")
            '        xTabla(20) = Replace(Mid(xTabla(20), 1, InStr(xTabla(20), "--><!--") - 1), "class='bg' colspan=1>", "")
            '        xTabla(30) = Replace(Mid(xTabla(30), 1, InStr(xTabla(30), "<br>") - 1), "class='bg' colspan=3>", "")
            '        xTabla(30) = Replace(xTabla(30).Trim(), "Principal - ", "")

            '        xRazSoc = (xTabla(3)).Trim()
            '        xEst = (xTabla(13)).Trim()
            '        xCon = (xTabla(16)).Trim()
            '        xDir = (xTabla(18)).Trim()
            '        xTel = (xTabla(20)).Trim()
            '        xAct = (xTabla(30)).Trim()
            '        xTCo = (xTabla(5)).Trim()
            '        xNomCom = (xTabla(7)).Trim()
            '        xFeIn = (xTabla(11)).Trim()

            '    ElseIf xTabla.Length = 34 Then

            '        xTabla(3) = Replace(xTabla(3), "class='bg' colspan=3>" & xNum & " - ", "")
            '        xTabla(13) = Replace(xTabla(13), "class='bg' colspan=1>", "")
            '        xTabla(15) = Replace(xTabla(15), "class='bg' colspan=1>", "")
            '        xTabla(17) = Replace(xTabla(17), "class='bg' colspan=1>", "")

            '        xRazSoc = (xTabla(3)).Trim()
            '        xEst = (xTabla(13)).Trim()
            '        xFeBa = (xTabla(15)).Trim()
            '        Dim habido As String = xTabla(17).Trim()
            '        Dim strJson As String
            '        strJson = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""CONDICION"":""" & habido & """,""FECHA_BAJA"":""" & xFeBa & """}]"
            '        ' strJson = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""FECHA_BAJA"":""" & xFeBa & """}]"
            '        Return strJson

            '    End If



            'End If

            'datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"
        ElseIf xTabla.Length >= 150 Then
            'DPORTA_RF
            If numero = "20" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(21) = Replace(xTabla(21), Chr(34), "") 'xDir2
                xTabla(22) = "-" 'xTel
                xTabla(33) = Replace(xTabla(33), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim() & " - " & (xTabla(21)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(33)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            ElseIf numero = "10" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(21) = Replace(xTabla(21), Chr(34), "") 'xDir2
                xTabla(22) = "-" 'xTel
                xTabla(35) = Replace(xTabla(35), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim() & " - " & (xTabla(21)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(35)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            ElseIf numero = "15" Then

                xTabla(4) = Replace(xTabla(4), Chr(34), "") 'xRazSoc
                xTabla(6) = Replace(xTabla(6), Chr(34), "") 'xAct
                xTabla(8) = Replace(xTabla(8), Chr(34), "") 'xFeIn
                xTabla(10) = Replace(xTabla(10), Chr(34), "") 'xCon
                xTabla(12) = Replace(xTabla(12), Chr(34), "") 'xTCo
                xTabla(14) = Replace(xTabla(14), Chr(34), "") 'xEst
                xTabla(16) = Replace(xTabla(16), Chr(34), "") 'xNomCom
                xTabla(20) = Replace(xTabla(20), Chr(34), "") 'xDir
                xTabla(21) = Replace(xTabla(21), Chr(34), "") 'xDir2
                xTabla(22) = "-" 'xTel
                xTabla(33) = Replace(xTabla(33), Chr(34), "") 'xFeBa

                xRazSoc = (xTabla(4)).Trim()
                xAct = (xTabla(6)).Trim()
                xFeIn = (xTabla(8)).Trim()
                xCon = (xTabla(10)).Trim()
                xTCo = (xTabla(12)).Trim()
                xEst = (xTabla(14)).Trim()
                xNomCom = (xTabla(16)).Trim()
                xDir = (xTabla(20)).Trim() & " - " & (xTabla(21)).Trim()
                xTel = (xTabla(22)).Trim()
                xFeBa = (xTabla(33)).Trim()


                datos = "[{""RAZON"":""" & xRazSoc & """,""ESTADO"":""" & xEst & """,""ACTIVIDAD"":""" & xAct & """,""TELEFONO"":""" & xTel & """,""CONDICION"":""" & xCon & """,""FECHA_INICIO"":""" & xFeIn & """,""FECHA_BAJA"":""" & xFeBa & """,""NOMBRE_COMERCIAL"":""" & xNomCom & """,""TIPO_CONTRIBUYENTE"":""" & xTCo & """,""DIRECCION"":""" & xDir & """}]"

            End If
        End If
        Return datos

        OTROsunat = datos


        Exit Function
EsteErr:
        OTROsunat = "error"
        '    MsgBox Err.Number & " - " & Err.Description, vbCritical, "Error"
    End Function


    'Function ObtenerDataRUC(ByVal documento As String, ByVal rutaLib As String, ByVal rutaDescarga As String) As String
    '    ' http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS03Alias?accion=consPorRuc&actReturn=1&nroRuc=20306066804&numRnd=601622236&modo=1

    '    Dim hWeb = "http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consPorRuc&nroRuc="
    '    Call DescargaCaptcha(rutaDescarga)
    '    Dim captcha_texto = ConvertirImagenTexto(rutaLib, rutaDescarga)
    '    If captcha_texto <> "" Then
    '        ' Return hWeb & documento & "&codigo=" & captcha_texto & "&tipdoc=1"
    '        Call Descargar(hWeb & documento & "&codigo=" & captcha_texto & "&tipdoc=1", rutaDescarga)
    '        Return OTROsunat(documento, rutaDescarga)
    '    Else
    '        Return "ERROR_CAPTCHA"
    '    End If


    'End Function

    'DPORTA_RF
    Function ObtenerDataRUC(ByVal documento As String, ByVal rutaLib As String, ByVal rutaDescarga As String) As String
        Dim hWeb = "https://api.sunat.cloud/ruc/"

        If documento <> "" Then
            Call Descargar(hWeb & documento, rutaDescarga)
            Return OTROsunat(documento, rutaDescarga)
        Else
            Return "ERROR_CAPTCHA"
        End If
    End Function

    'DPORTA_RF
    Function ObtenerDataDNI(ByVal documento As String, ByVal rutaLib As String, ByVal rutaDescarga As String) As String
        Dim hWeb = "https://api.sunat.cloud/ruc/"

        If documento <> "" Then
            Call Descargar(hWeb & documento, rutaDescarga)
            Return OTROsunat(documento, rutaDescarga)
        Else
            Return "ERROR_CAPTCHA"
        End If
    End Function

    Function ObtenerDataRUCcCaptcha(ByVal documento As String, ByVal rutaLib As String, ByVal captcha_texto As String) As String


        Dim hWeb = "http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consPorRuc&nroRuc="

        If captcha_texto <> "" Then
            Call Descargar(hWeb & documento & "&codigo=" & captcha_texto & "&tipdoc=1", rutaLib)
            Return OTROsunat(documento, rutaLib)
        Else
            Return "ERROR_CAPTCHA"
        End If
    End Function

    'Function ObtenerDataDNI(ByVal documento As String, ByVal rutaLib As String, ByVal rutaDescarga As String) As String

    '    Dim hWeb = "http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consPorTipdoc&nrodoc="
    '    Call DescargaCaptcha(rutaDescarga)
    '    Dim captcha_texto = ConvertirImagenTexto(rutaLib, rutaDescarga)
    '    If captcha_texto <> "" Then
    '        Call Descargar(hWeb & documento & "&codigo=" & captcha_texto & "&tipdoc=1", rutaDescarga)
    '        Return OTROsunat(documento, rutaDescarga)
    '    Else
    '        Return "ERROR_CAPTCHA"
    '    End If
    'End Function

    Function consultarRUC(NRO As String) As String()
        Throw New NotImplementedException
    End Function

End Class
