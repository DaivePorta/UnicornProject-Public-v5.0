'Imports Microsoft.VisualBasic
'Imports System.Runtime.InteropServices
'Imports System.Text
'Imports System.Threading.Timeout

'Imports System
'Imports System.Web
'Imports System.Data
'Imports System.IO
Public Class BBComisionSistemaPension
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

#Region "Pensiones"
    Public Function ListarValidacion(ByVal p_FCOSIPE_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDC_LISTAR_VALIDACION_SISTEMA_PENSION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarComuna(ByVal p_FCOSIPE_CTLG_CODE As String, ByVal p_FTCONFI_FCOPERI_CODE As String, p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_LISTAR_CONFIGURACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_FCOPERI_CODE", p_FTCONFI_FCOPERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarComisionSistemaPension(ByVal p_FCOSIPE_CODE As String, ByVal p_FCOSIPE_CTLG_CODE As String, ByVal p_FCOPERI_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCO_LISTAR_COMSION_SISTEMA_PENSIONES", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CODE", p_FCOSIPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOPERI_CODE", p_FCOPERI_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarPeriodo() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCP_LISTAR_PERIODO", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function CrearComisionSistemaPension(ByVal p_FCOSIPE_USUA_ID As String, ByVal FCOSIPE_RHCNPL_CODE_PLAN As String, ByVal p_FCOSIPE_COLUMNA As String, ByVal p_FCOSIPE_DATO As String,
                                                ByVal p_FCOSIPE_FTVREPE_CODE As String, ByVal p_FCOSIPE_CTLG_CODE As String, ByVal p_SALIDA As String, ByVal p_FCOPERI_CODE As String, ByVal FCOSIPE_GRUP As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCO_CREAR_COMSION_SISTEMA_PENSION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_USUA_ID", p_FCOSIPE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_RHCNPL_CODE_PLAN", FCOSIPE_RHCNPL_CODE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_COLUMNA", p_FCOSIPE_COLUMNA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_DATO", p_FCOSIPE_DATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_FTVREPE_CODE", p_FCOSIPE_FTVREPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOPERI_CODE", p_FCOPERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_GRUP", FCOSIPE_GRUP, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_FCOSIPE_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarComisionSistemaPension(
                                               ByVal p_FCOSIPE_CODE As String, ByVal p_FCOSIPE_COLUMNA As String,
                                               ByVal p_FCOSIPE_DATO As String, ByVal p_FCOSIPE_USUA_ID As String,
                                               ByVal p_FCOSIPE_FTVREPE_CODE As String, ByVal p_SALIDA As String) As String

        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCO_ACTUALIZA_COMSION_SISTEMA_PENSION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CODE", p_FCOSIPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_COLUMNA", p_FCOSIPE_COLUMNA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_DATO", p_FCOSIPE_DATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_USUA_ID", p_FCOSIPE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_FTVREPE_CODE", p_FCOSIPE_FTVREPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarCombo(ByVal p_Tipo As String, ByVal p_FCOSIPE_CODE As String, ByVal p_FTVREPE_ESTADO_IND As String,
                                ByVal p_FCOPERI_CODE As String, ByVal p_FCOSIPE_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_COMBO_SISTEMA_PENSIONARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Tipo", p_Tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CODE", p_FCOSIPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVREPE_ESTADO_IND", p_FTVREPE_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOPERI_CODE", p_FCOPERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region
#Region "ConfiguracionComisiones"
    Public Function CrearConfiguracion(
                                              ByVal p_FTCONFI_CODE As String, ByVal p_FTCONFI_RHCNPL_CODE As String,
                                              ByVal p_FTCONFI_ESTADO_IND As String, ByVal p_FTCONFI_USUA_ID As String,
                                              ByVal p_FTCONFI_CTLG_CODE As String, ByVal p_FTCONFI_PADRE As String, ByVal p_FTCONFI_FCOPERI_CODE As String,
                                              ByVal p_FTCONFI_bAFP As String, ByVal p_FTCONFI_bONP As String,
                                              ByVal p_FTCONFI_bOTROS As String, ByVal p_FTCONFI_TIPO As String, ByVal p_SALIDA As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CONFIGURACION_SISTEMA_PENSIONARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_RHCNPL_CODE", p_FTCONFI_RHCNPL_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_ESTADO_IND", p_FTCONFI_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_USUA_ID", p_FTCONFI_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CTLG_CODE", p_FTCONFI_CTLG_CODE, ParameterDirection.Input, 253))

            If p_FTCONFI_PADRE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_PADRE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_PADRE", p_FTCONFI_PADRE, ParameterDirection.Input, 253))
            End If


            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_FCOPERI_CODE", p_FTCONFI_FCOPERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bAFP", p_FTCONFI_bAFP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bONP", p_FTCONFI_bONP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bOTROS", p_FTCONFI_bOTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_TIPO", p_FTCONFI_TIPO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_FTCONFI_CODE").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarConfiguracion(
                                             ByVal p_FTCONFI_CODE As String, ByVal FTCONFI_COLUMNA As String,
                                             ByVal p_FTCONFI_RHCNPL_CODE As String, ByVal p_FTCONFI_ESTADO_IND As String,
                                             ByVal p_FTCONFI_USUA_ID As String,
                                             ByVal p_FTCONFI_PADRE As String, ByVal p_FTCONFI_bAFP As String,
                                             ByVal p_FTCONFI_bONP As String, ByVal p_FTCONFI_bOTROS As String,
                                             ByVal p_FTCONFI_TIPO As String, ByVal p_SALIDA As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CONFIGURACION_SISTEMA_PENSIONARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CODE", p_FTCONFI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@FTCONFI_COLUMNA", FTCONFI_COLUMNA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_RHCNPL_CODE", p_FTCONFI_RHCNPL_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_ESTADO_IND", p_FTCONFI_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_USUA_ID", p_FTCONFI_USUA_ID, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CTLG_CODE", p_FTCONFI_CTLG_CODE, ParameterDirection.Input, 253))
            If p_FTCONFI_PADRE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_PADRE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_PADRE", p_FTCONFI_PADRE, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bAFP", p_FTCONFI_bAFP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bONP", p_FTCONFI_bONP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_bOTROS", p_FTCONFI_bOTROS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_TIPO", p_FTCONFI_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", p_SALIDA, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarConfiguracion(ByVal P_FTCONFI_CODE As String, ByVal p_FTCONFI_CTLG_CODE As String, ByVal p_FCOPERI_CODE As String) As DataTable
        Try


            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CONFIGURACION_SISTEMA_PENSIONARIO", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@P_FTCONFI_CODE", P_FTCONFI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CTLG_CODE", p_FTCONFI_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOPERI_CODE", p_FCOPERI_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarFechaHora() As String
        Try
            Dim cResultado As String = ""
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_HORA_FECHA_SISTEMA", CommandType.StoredProcedure)


            'cmd.Parameters.Add(cn.GetNewParameter("@P_FTCONFI_CODE", P_FTCONFI_CODE, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_FTCONFI_CTLG_CODE", p_FTCONFI_CTLG_CODE, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_FCOPERI_CODE", p_FCOPERI_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                cResultado = dt.Rows(0)("Fecha").ToString()

                Return cResultado
            Else
                Return ""
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Verificar_Configuracion_Sistema(
                                             ByVal p_CTLG_CODE As String, ByVal p_PERI_CODE As String,
                                             ByVal p_SALIDA As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_VERIFICAR_CONFIGURACION_SISTEMA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERI_CODE", p_PERI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Concepto(ByVal p_RHCNPL_DEPEND_CODE As String, ByVal p_CODE As String, ByVal p_TIPO As String, ByVal p_PERIODO As String) As DataTable
        Try


            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CONCEPTO", CommandType.StoredProcedure)

            If p_RHCNPL_DEPEND_CODE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_RHCNPL_DEPEND_CODE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_RHCNPL_DEPEND_CODE", p_RHCNPL_DEPEND_CODE, ParameterDirection.Input, 253))
            End If

            If p_CODE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            If p_PERIODO = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO", p_PERIODO.ToUpper, ParameterDirection.Input, 253))
            End If

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region


End Class
